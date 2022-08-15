const userService = require('../../../../modules/users/users.services');
const userRepository = require('../../../../modules/users/users.repositories');
const validation = require('../../../../modules/tokens/tokens.validations');

const crypt = require('../../../../libs/crypt');
const jwt = require('../../../../libs/jwt');
const uuid = require('../../../../libs/uuid');
const wrap = require('../../../../libs/wrap');

const { CODE, MESSAGE } = require('../../../../libs/constant');

// mock repositories
jest.mock('../../../../modules/users/users.repositories', () => ({
  insertOne: jest.fn(),
  findOne: jest.fn(),
  findOffset: jest.fn(),
  updateOne: jest.fn(),
})
);

// mock validation
jest.mock('../../../../modules/tokens/tokens.validations', () => ({
  register: {
    validate: jest.fn(),
  },
  login: {
    validate: jest.fn(),
  },
  create: {
    validate: jest.fn(),
  },
  update: {
    validate: jest.fn(),
  },
})
);

// mock libraries
jest.mock('../../../../libs/crypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
})
);

jest.mock('../../../../libs/jwt', () => ({
  verifyRefresh: jest.fn(),
  sign: jest.fn(),
  signRefresh: jest.fn(),
})
);

jest.mock('../../../../libs/uuid', () => ({
  generate: jest.fn(),
})
);

describe('user service', () => {
  describe('login', () => {
    const body = {
      username: 'user',
      password: 'hashedsecret'
    };
  
    const validationReturn = { error: null };
    const userReturn = {
      _id: '5dbafa36-c300-4896-85dc-5a8cb1ff7da2',
      email: 'user@usedeall.com',
      username: 'user',
      password: 'hashedsecret',
      roles: ['user'],
      isDeleted: false,
      isVerified: true,
      createdAt: new Date('01-01-2000'),
      updatedAt: new Date('01-01-2000'),
    };

    test('succeed', async () => {
      validation.login.validate.mockReturnValueOnce(validationReturn);
      userRepository.findOne.mockResolvedValueOnce(userReturn);
      crypt.compare.mockResolvedValueOnce(true);
      jwt.sign.mockReturnValueOnce('token');
      jwt.signRefresh.mockReturnValueOnce('refreshtoken');

      const res = await userService.login(body);

      const expected = {
        id: '5dbafa36-c300-4896-85dc-5a8cb1ff7da2',
        email: 'user@usedeall.com',
        username: 'user',
        roles: ['user'],
        isDeleted: false,
        isVerified: true,
        createdAt: new Date('01-01-2000'),
        updatedAt: new Date('01-01-2000'),
        token: 'token',
        refreshToken: 'refreshtoken',
      }
      expect(res).toEqual(wrap.result(CODE.OK, MESSAGE.LOGIN_SUCCESS, expected))
    })
  });
});