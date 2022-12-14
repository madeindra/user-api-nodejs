// collection names
const COLLECTION = Object.freeze({
  USERS: 'users',
  TOKENS: 'tokens',
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
  SERVER_OK: 'Server is operating properly.',
  GENERAL: 'Operation successful.',
  FAILED: 'Operation failed.',
  ERROR: 'An error occured.',
  BAD_REQUEST: 'Bad request.',
  DATABASE_FAILED: 'Database operation failed.',
  EMAIL_INVALID: 'Invalid email format.',
  CREDENTIAL_INVALID: 'Invalid username or password',
  EMAIL_REGISTERED: 'Email is already registered.',
  USERNAME_TAKEN: 'Username is already taken.',
  REGISTRATION_SUCCESS: 'Registration successful.',
  LOGIN_SUCCESS: 'Login successful.',
  UNAUTHORIZED: 'Unauthorized access.',
  ROUTE_NOT_FOUND: 'Route not found.',
  USER_NOT_EXIST: 'User does not exist.',
  CANNOT_LOGIN: 'This user cannot be used.',
});

module.exports = {
  COLLECTION,
  ROLES,
  CODE,
  MESSAGE,
};
