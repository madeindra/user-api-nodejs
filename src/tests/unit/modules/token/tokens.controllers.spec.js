// import mock
const { mockRequest, mockResponse } = require('../../../mock');

const tokenController = require('../../../../modules/tokens/tokens.controllers');
const tokenService = require('../../../../modules/tokens/tokens.services');

const wrap = require('../../../../libs/wrap');

const { CODE, MESSAGE } = require('../../../../libs/constant');

// mock services
jest.mock('../../../../modules/tokens/tokens.services', () => ({
  refresh: jest.fn(),
})
);

describe('token controller', () => {
  describe('refresh', () => {
    let res;
    let req;

    beforeEach(() => {
      res = mockResponse();
      req = mockRequest({ refreshToken: 'jsonwebtokenhere' });
    });

    const result = {
      id: '5dbafa36-c300-4896-85dc-5a8cb1ff7da2',
      email: 'user@usedeall.com',
      username: 'user',
      roles: ['user'],
      isDeleted: false,
      isVerified: true,
      createdAt: new Date('01-01-2000'),
      updatedAt: new Date('01-01-2000'),
      token: 'newtoken',
      refreshToken: 'newRefreshToken',
    }

    test('succeed', async () => {
      tokenService.refresh.mockResolvedValueOnce(wrap.result(CODE.OK, MESSAGE.GENERAL, result));

      await tokenController.refresh(req, res);

      expect(res.status).toHaveBeenCalledWith(CODE.OK);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: MESSAGE.GENERAL,
        data: result
      });
    })

    test('failed', async () => {
      tokenService.refresh.mockRejectedValueOnce(wrap.result(CODE.INTERNAL_SERVER_ERROR, MESSAGE.FAILED));

      await tokenController.refresh(req, res);

      expect(res.status).toHaveBeenCalledWith(CODE.INTERNAL_SERVER_ERROR);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: MESSAGE.FAILED,
      });
    })
  });
});