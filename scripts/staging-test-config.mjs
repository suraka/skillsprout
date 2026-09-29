/**
 * @typedef {object} StagingTestConfig
 * @property {string} baseURL
 * @property {string} apiOrigin
 * @property {string} firebaseWebApiKey
 * @property {string} parentAEmail
 * @property {string} parentAPassword
 */

const REQUIRED_KEYS = [
  'STAGING_FRONTEND_URL',
  'STAGING_API_ORIGIN',
  'STAGING_EXPECTED_API_ORIGIN',
  'STAGING_FIREBASE_WEB_API_KEY',
  'STAGING_PARENT_A_EMAIL',
  'STAGING_PARENT_A_PASSWORD',
];

/**
 * Loads the explicitly allowlisted remote staging browser-test configuration.
 *
 * @param {NodeJS.ProcessEnv} env
 * @returns {StagingTestConfig}
 */
export function loadStagingConfig(env) {
  const values = Object.fromEntries(
    REQUIRED_KEYS.map((key) => [key, requiredValue(env, key)]),
  );

  const baseURL = parseHttpsOrigin(values.STAGING_FRONTEND_URL, 'STAGING_FRONTEND_URL');
  const apiOrigin = parseHttpsOrigin(values.STAGING_API_ORIGIN, 'STAGING_API_ORIGIN');
  const expectedApiOrigin = parseHttpsOrigin(
    values.STAGING_EXPECTED_API_ORIGIN,
    'STAGING_EXPECTED_API_ORIGIN',
  );

  if (apiOrigin !== expectedApiOrigin) {
    throw new Error(
      'STAGING_API_ORIGIN must exactly match STAGING_EXPECTED_API_ORIGIN before staging tests run',
    );
  }

  return {
    baseURL,
    apiOrigin,
    firebaseWebApiKey: values.STAGING_FIREBASE_WEB_API_KEY,
    parentAEmail: values.STAGING_PARENT_A_EMAIL,
    parentAPassword: values.STAGING_PARENT_A_PASSWORD,
  };
}

function requiredValue(env, key) {
  const value = env[key];
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Missing required staging configuration: ${key}`);
  }
  return value;
}

function parseHttpsOrigin(value, key) {
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    throw new Error(`${key} must be an HTTPS origin`);
  }

  if (
    parsed.protocol !== 'https:' ||
    parsed.username ||
    parsed.password ||
    parsed.pathname !== '/' ||
    parsed.search ||
    parsed.hash
  ) {
    throw new Error(`${key} must be an HTTPS origin`);
  }

  return parsed.origin;
}
