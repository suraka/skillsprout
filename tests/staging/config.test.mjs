import test from 'node:test';
import assert from 'node:assert/strict';
import { loadStagingConfig } from '../../scripts/staging-test-config.mjs';

const password = 'synthetic-parent-password';
const validEnv = Object.freeze({
  STAGING_FRONTEND_URL: 'https://staging.skillsprout.example',
  STAGING_API_ORIGIN: 'https://api.staging.skillsprout.example',
  STAGING_EXPECTED_API_ORIGIN: 'https://api.staging.skillsprout.example',
  STAGING_FIREBASE_WEB_API_KEY: 'public-staging-api-key',
  STAGING_PARENT_A_EMAIL: 'guardian-a@example.test',
  STAGING_PARENT_A_PASSWORD: password,
});

function environment(overrides = {}) {
  return { ...validEnv, ...overrides };
}

function errorFrom(callback) {
  try {
    callback();
  } catch (error) {
    return error;
  }
  assert.fail('Expected configuration validation to throw');
}

test('accepts an exact HTTPS staging target', () => {
  const config = loadStagingConfig(environment());

  assert.deepEqual(config, {
    baseURL: validEnv.STAGING_FRONTEND_URL,
    apiOrigin: validEnv.STAGING_API_ORIGIN,
    firebaseWebApiKey: validEnv.STAGING_FIREBASE_WEB_API_KEY,
    parentAEmail: validEnv.STAGING_PARENT_A_EMAIL,
    parentAPassword: password,
  });
});

test('rejects each required missing staging value before requests', () => {
  const originalFetch = globalThis.fetch;
  let requests = 0;
  globalThis.fetch = () => {
    requests += 1;
    throw new Error('A configuration guard must not make requests');
  };

  try {
    for (const key of Object.keys(validEnv)) {
      const error = errorFrom(() => loadStagingConfig(environment({ [key]: '' })));
      assert.match(error.message, new RegExp(key));
    }
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.equal(requests, 0);
});

test('rejects non-HTTPS frontend and API origins', () => {
  assert.throws(
    () => loadStagingConfig(environment({ STAGING_FRONTEND_URL: 'http://staging.skillsprout.example' })),
    /STAGING_FRONTEND_URL must be an HTTPS origin/,
  );
  assert.throws(
    () => loadStagingConfig(environment({ STAGING_API_ORIGIN: 'http://api.staging.skillsprout.example' })),
    /STAGING_API_ORIGIN must be an HTTPS origin/,
  );
});

test('rejects credentials and URL components that are not origins', () => {
  for (const value of [
    'https://guardian:password@staging.skillsprout.example',
    'https://staging.skillsprout.example/path',
    'https://staging.skillsprout.example?mode=test',
    'https://staging.skillsprout.example#fragment',
  ]) {
    assert.throws(
      () => loadStagingConfig(environment({ STAGING_FRONTEND_URL: value })),
      /STAGING_FRONTEND_URL must be an HTTPS origin/,
    );
  }
});

test('rejects API origin mismatches, including a production-looking target', () => {
  assert.throws(
    () => loadStagingConfig(environment({
      STAGING_EXPECTED_API_ORIGIN: 'https://api.production.skillsprout.example',
    })),
    /STAGING_API_ORIGIN must exactly match STAGING_EXPECTED_API_ORIGIN/,
  );
});

test('never includes a supplied password in validation errors', () => {
  const error = errorFrom(() => loadStagingConfig(environment({
    STAGING_API_ORIGIN: 'http://api.staging.skillsprout.example',
  })));

  assert.doesNotMatch(error.message, new RegExp(password));
});
