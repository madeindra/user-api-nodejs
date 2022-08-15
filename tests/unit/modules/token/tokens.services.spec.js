const tokenService = require('../../../../modules/tokens/tokens.services');
const tokenRepository = require('../../../../modules/tokens/tokens.repositories');
const userRepository = require('../../../../modules/users/users.repositories');
const validation = require('../../../../modules/tokens/tokens.validations');

const jwt = require('../../../../libs/jwt');
const uuid = require('../../../../libs/uuid');
const wrap = require('../../../../libs/wrap');

const { CODE, MESSAGE } = require('../../../../libs/constant');

// mock repositories
jest.mock('../../../../modules/tokens/tokens.repositories', () => ({
  findOne: jest.fn(),
  insertOne: jest.fn(),
})
);

jest.mock('../../../../modules/users/users.repositories', () => ({
  findOne: jest.fn(),
})
);

// mock validation
jest.mock('../../../../modules/tokens/tokens.validations', () => ({
  refresh: {
    validate: jest.fn(),
  },
})
);

// mock libraries
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

describe('token service', () => {
  const body = {
    refreshToken: 'jsonrefreshtoken',
  };

  const validationReturn = { error: null };
  const jwtReturn = { id: '5dbafa36-c300-4896-85dc-5a8cb1ff7da2' };
  const userReturn = {
    _id: '5dbafa36-c300-4896-85dc-5a8cb1ff7da2',
    email: 'user@usedeall.com',
    username: 'user',
    roles: ['user'],
    isDeleted: false,
    isVerified: true,
    createdAt: new Date('01-01-2000'),
    updatedAt: new Date('01-01-2000'),
  };

  describe('refresh', () => {
    test('succeed', async () => {
      validation.refresh.validate.mockReturnValueOnce(validationReturn);
      tokenRepository.findOne.mockResolvedValueOnce(null);
      jwt.verifyRefresh.mockReturnValueOnce(jwtReturn);
      userRepository.findOne.mockResolvedValueOnce(userReturn);
      uuid.generate.mockReturnValue('7122cda8-d2e2-4d13-838b-ff05b72cb5a6');
      tokenRepository.insertOne.mockResolvedValueOnce(null);
      jwt.sign.mockReturnValueOnce('token');
      jwt.signRefresh.mockReturnValueOnce('refreshtoken');

      const res = await tokenService.refresh(body);

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
      expect(res).toEqual(wrap.result(CODE.OK, MESSAGE.GENERAL, expected))
    })
  });
});