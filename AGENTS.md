# SkillSprout development agreement

Authoritative specification: docs/MASTER_BLUEPRINT.md (v2.3).
Canonical shared checklist: docs/ROADMAP_AND_FEATURE_STATUS.md in suraka/skillsprout.
Read and update the checklist and actual test evidence every session.
Preserve current framework, course/learner IDs, data and migration history.
Use review branches and complete vertical slices. Guest-only demos intentionally use no database/auth calls.
Never represent client-claimed completion as verified evidence; preserve legacy records.
No production test fixtures, destructive resets, secrets or real child data in source/logs.
Never claim test, push, deployment or human review success without verification.
