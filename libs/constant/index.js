// collection names
const COLLECTION = Object.freeze({
  USERS: 'users',
});

// roles names
const ROLES = Object.freeze({
  USER: 'user',
  ADMIN: 'admin',
});

// status codes
const CODE = Object.freeze({
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
});

// response message
const MESSAGE = Object.freeze({
  GENERAL: 'Operation successful.',
  FAILED: 'Operation failed.',
  BAD_REQUEST: 'Bad request.',
  DATABASE_FAILED: 'Database operation failed.',
  EMAIL_INVALID: 'Invalid email format.',
  CREDENTIAL_INVALID: 'Invalid email or password',
  EMAIL_REGISTERED: 'Email is already registered.',
  USERNAME_TAKEN: 'Username is already taken.',
  REGISTRATION_SUCCESS: 'Registration successful.',
  LOGIN_SUCCESS: 'Login successful.',
});

module.exports = {
  COLLECTION,
  ROLES,
  CODE,
  MESSAGE,
}
