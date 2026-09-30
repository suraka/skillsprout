'use client';

import { useCallback, useEffect, useState } from 'react';
import { Config, request } from '@/lib/academy';

type Gate = 'curriculum' | 'safety' | 'assets';
type Decision = 'approved' | 'rejected' | null;
type ReviewStatus = {
  content_digest: string;
  required_gates: Gate[];
  decisions: Record<Gate, Decision>;
  missing_gates: Gate[];
  rejected_gates: Gate[];
  ready_to_publish: boolean;
};

const labels: Record<Gate, string> = {
  curriculum: 'Learning content',
  safety: 'Child safety',
  assets: 'Asset rights and sources',
};

export function CourseReviewPanel({ config, courseId }: { config: Config; courseId: string }) {
  const [status, setStatus] = useState<ReviewStatus | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(async () => {
    setError('');
    setStatus(await request<ReviewStatus>(config, `/admin/courses/${courseId}/reviews`));
  }, [config, courseId]);

  useEffect(() => {
    let active = true;
    void request<ReviewStatus>(config, `/admin/courses/${courseId}/reviews`)
      .then((value) => { if (active) setStatus(value); })
      .catch((e) => { if (active) setError((e as Error).message); });
    return () => { active = false; };
  }, [courseId, config]);

  async function recordDecision(gate: Gate, decision: Exclude<Decision, null>) {
    setBusy(true);
    setError('');
    try {
      await request(config, `/admin/courses/${courseId}/reviews`, {
        method: 'POST',
        body: JSON.stringify({ review_gate: gate, decision }),
      });
      await refresh();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return <section className="admin-panel" aria-labelledby="course-review-title">
    <h3 id="course-review-title">Independent review</h3>
    <p className="muted">Course authors cannot approve their own course. Any content edit creates a new version that must be reviewed again.</p>
    {status && <>
      <p className={status.ready_to_publish ? 'notice' : 'notice error'} role="status">
        {status.ready_to_publish ? 'Required reviews are recorded for this version.' : 'This version is not ready to publish.'}
      </p>
      <ul>
        {status.required_gates.map((gate) => <li key={gate}>
          <strong>{labels[gate]}:</strong> {status.decisions[gate] ?? 'Waiting for review'}
          {status.decisions[gate] === null && <span className="review-actions">
            <button className="text-button" disabled={busy} onClick={() => void recordDecision(gate, 'approved')}>Approve</button>
            <button className="text-button" disabled={busy} onClick={() => void recordDecision(gate, 'rejected')}>Request changes</button>
          </span>}
        </li>)}
      </ul>
    </>}
    {error && <p className="notice error" role="alert">{error}</p>}
    <button className="button outline" disabled={busy} onClick={() => void refresh().catch((e) => setError((e as Error).message))}>Refresh review status</button>
  </section>;
}
