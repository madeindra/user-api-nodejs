// import mock
const { mockRequest, mockResponse } = require('../../../mock');

const homeController = require('../../../../modules/home/home.controller');

const { CODE, MESSAGE } = require('../../../../libs/constant');

describe('home controller', () => {
  describe('ping', () => {
    let res;
    let req;

    beforeEach(() => {
      res = mockResponse();
      req = mockRequest();
    });

    test('succeed', async () => {
      await homeController.ping(req, res);

      expect(res.status).toHaveBeenCalledWith(CODE.OK);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: MESSAGE.SERVER_OK,
      });
    })
  });
});