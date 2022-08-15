// import mock
const { mockRequest, mockResponse } = require('../../../mock');

const userController = require('../../../../modules/users/users.controllers');
const userService = require('../../../../modules/users/users.services');

const wrap = require('../../../../libs/wrap');

const { CODE, MESSAGE } = require('../../../../libs/constant');

// mock services
jest.mock('../../../../modules/users/users.services', () => ({
  register: jest.fn(),
  login: jest.fn(),
  getProfile: jest.fn(),
  createUser: jest.fn(),
  readAllUsers: jest.fn(),
  readOneUser: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
  migrate: jest.fn(),
})
);

describe('token controller', () => {
  describe('register', () => {
    let res;
    let req;

    const body = {
      username: 'user',
      email: 'user@usedeall.com',
      password: 'secret',
    }

    beforeEach(() => {
      res = mockResponse();
      req = mockRequest(body);
    });

    test('success', async () => {
      userService.register.mockResolvedValueOnce(wrap.result(CODE.CREATED, MESSAGE.REGISTRATION_SUCCESS));

      await userController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(CODE.CREATED);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: MESSAGE.REGISTRATION_SUCCESS,
      });
    })

    test('failed', async () => {
      userService.register.mockRejectedValueOnce(wrap.result(CODE.INTERNAL_SERVER_ERROR, MESSAGE.FAILED));

      await userController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(CODE.INTERNAL_SERVER_ERROR);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: MESSAGE.FAILED,
      });
    })
  });

  describe('login', () => {
    let res;
    let req;

    const body = {
      username: 'user',
      password: 'secret',
    }

    beforeEach(() => {
      res = mockResponse();
      req = mockRequest(body);
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
      token: 'jsonwebtokenstring',
      refreshToken: 'jsonwebtokenstring',
    }

    test('success', async () => {
      userService.login.mockResolvedValueOnce(wrap.result(CODE.OK, MESSAGE.LOGIN_SUCCESS, result));

      await userController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(CODE.OK);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: MESSAGE.LOGIN_SUCCESS,
        data: result,
      });
    })

    test('failed', async () => {
      userService.login.mockRejectedValueOnce(wrap.result(CODE.INTERNAL_SERVER_ERROR, MESSAGE.FAILED));

      await userController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(CODE.INTERNAL_SERVER_ERROR);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: MESSAGE.FAILED,
      });
    })
  });

  describe('getProfile', () => {
    let res;
    let req;

    const user = {
      _id: '5dbafa36-c300-4896-85dc-5a8cb1ff7da2',
    }

    beforeEach(() => {
      res = mockResponse();
      req = mockRequest({}, user);
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
    }

    test('success', async () => {
      userService.getProfile.mockResolvedValueOnce(wrap.result(CODE.OK, MESSAGE.GENERAL, result));

      await userController.getProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(CODE.OK);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: MESSAGE.GENERAL,
        data: result,
      });
    })

    test('failed', async () => {
      userService.getProfile.mockRejectedValueOnce(wrap.result(CODE.INTERNAL_SERVER_ERROR, MESSAGE.FAILED));

      await userController.getProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(CODE.INTERNAL_SERVER_ERROR);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: MESSAGE.FAILED,
      });
    })
  });

  describe('createUser', () => {
    let res;
    let req;

    const body = {
      email: 'user@usedeall.com',
      username: 'user',
      roles: ['user'],
      password: 'secret',
    }

    beforeEach(() => {
      res = mockResponse();
      req = mockRequest(body);
    });

    const result = {
      id: '5dbafa36-c300-4896-85dc-5a8cb1ff7da2',
      email: 'user@usedeall.com',
      username: 'user',
      roles: ['user'],
      password: 'PASSWORD REDACTED',
      isDeleted: false,
      isVerified: true,
      createdAt: new Date('01-01-2000'),
      updatedAt: new Date('01-01-2000'),
    }

    test('success', async () => {
      userService.createUser.mockResolvedValueOnce(wrap.result(CODE.OK, MESSAGE.GENERAL, result));

      await userController.createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(CODE.OK);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: MESSAGE.GENERAL,
        data: result,
      });
    })

    test('failed', async () => {
      userService.createUser.mockRejectedValueOnce(wrap.result(CODE.INTERNAL_SERVER_ERROR, MESSAGE.FAILED));

      await userController.createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(CODE.INTERNAL_SERVER_ERROR);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: MESSAGE.FAILED,
      });
    })
  });

  describe('readAllUsers', () => {
    let res;
    let req;

    const query = {
      sort: '1',
      page: '1',
      limit: '1',
    }

    beforeEach(() => {
      res = mockResponse();
      req = mockRequest({}, {}, {}, {}, query);
    });

    const result = [{
      id: '5dbafa36-c300-4896-85dc-5a8cb1ff7da2',
      email: 'user@usedeall.com',
      username: 'user',
      roles: ['user'],
      password: 'PASSWORD REDACTED',
      isDeleted: false,
      isVerified: true,
      createdAt: new Date('01-01-2000'),
      updatedAt: new Date('01-01-2000'),
    }];

    test('success', async () => {
      userService.readAllUsers.mockResolvedValueOnce(wrap.result(CODE.OK, MESSAGE.GENERAL, result));

      await userController.readAllUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(CODE.OK);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: MESSAGE.GENERAL,
        data: result,
      });
    })

    test('failed', async () => {
      userService.readAllUsers.mockRejectedValueOnce(wrap.result(CODE.INTERNAL_SERVER_ERROR, MESSAGE.FAILED));

      await userController.readAllUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(CODE.INTERNAL_SERVER_ERROR);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: MESSAGE.FAILED,
      });
    })
  });

  describe('readOneUser', () => {
    let res;
    let req;

    const params = {
      id: '5dbafa36-c300-4896-85dc-5a8cb1ff7da2',
    }

    beforeEach(() => {
      res = mockResponse();
      req = mockRequest({}, {}, {}, params);
    });

    const result = {
      id: '5dbafa36-c300-4896-85dc-5a8cb1ff7da2',
      email: 'user@usedeall.com',
      username: 'user',
      roles: ['user'],
      password: 'PASSWORD REDACTED',
      isDeleted: false,
      isVerified: true,
      createdAt: new Date('01-01-2000'),
      updatedAt: new Date('01-01-2000'),
    };

    test('success', async () => {
      userService.readOneUser.mockResolvedValueOnce(wrap.result(CODE.OK, MESSAGE.GENERAL, result));

      await userController.readOneUser(req, res);

      expect(res.status).toHaveBeenCalledWith(CODE.OK);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: MESSAGE.GENERAL,
        data: result,
      });
    })

    test('failed', async () => {
      userService.readOneUser.mockRejectedValueOnce(wrap.result(CODE.INTERNAL_SERVER_ERROR, MESSAGE.FAILED));

      await userController.readOneUser(req, res);

      expect(res.status).toHaveBeenCalledWith(CODE.INTERNAL_SERVER_ERROR);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: MESSAGE.FAILED,
      });
    })
  });

  describe('updateUser', () => {
    let res;
    let req;

    const body = {
      email: 'user@usedeall.com',
      username: 'user',
      roles: ['user'],
      password: 'PASSWORD REDACTED',
      isDeleted: false,
      isVerified: true,
    }

    const params = {
      id: '5dbafa36-c300-4896-85dc-5a8cb1ff7da2',
    }

    beforeEach(() => {
      res = mockResponse();
      req = mockRequest(body, {}, {}, params);
    });

    const result = {
      id: '5dbafa36-c300-4896-85dc-5a8cb1ff7da2',
      email: 'user@usedeall.com',
      username: 'user',
      roles: ['user'],
      password: 'PASSWORD REDACTED',
      isDeleted: false,
      isVerified: true,
      createdAt: new Date('01-01-2000'),
      updatedAt: new Date('01-01-2000'),
    }

    test('success', async () => {
      userService.updateUser.mockResolvedValueOnce(wrap.result(CODE.OK, MESSAGE.GENERAL, result));

      await userController.updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(CODE.OK);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: MESSAGE.GENERAL,
        data: result,
      });
    })

    test('failed', async () => {
      userService.updateUser.mockRejectedValueOnce(wrap.result(CODE.INTERNAL_SERVER_ERROR, MESSAGE.FAILED));

      await userController.updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(CODE.INTERNAL_SERVER_ERROR);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: MESSAGE.FAILED,
      });
    })
  });

  describe('deleteUser', () => {
    let res;
    let req;

    const params = {
      id: '5dbafa36-c300-4896-85dc-5a8cb1ff7da2',
    }

    beforeEach(() => {
      res = mockResponse();
      req = mockRequest({}, {}, {}, params);
    });

    test('success', async () => {
      userService.deleteUser.mockResolvedValueOnce(wrap.result(CODE.OK, MESSAGE.GENERAL));

      await userController.deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(CODE.OK);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: MESSAGE.GENERAL,
      });
    })

    test('failed', async () => {
      userService.deleteUser.mockRejectedValueOnce(wrap.result(CODE.INTERNAL_SERVER_ERROR, MESSAGE.FAILED));

      await userController.deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(CODE.INTERNAL_SERVER_ERROR);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: MESSAGE.FAILED,
      });
    })
  });

  describe('migrate', () => {
    let res;
    let req;

    beforeEach(() => {
      res = mockResponse();
      req = mockRequest();
    });

    const result = {
      id: '5dbafa36-c300-4896-85dc-5a8cb1ff7da2',
      email: 'admin@usedeall.com',
      username: 'admin',
      roles: ['admin', 'user'],
      isDeleted: false,
      isVerified: true,
      createdAt: new Date('01-01-2000'),
      updatedAt: new Date('01-01-2000'),
    }

    test('success', async () => {
      userService.migrate.mockResolvedValueOnce(wrap.result(CODE.CREATED, MESSAGE.REGISTRATION_SUCCESS, result));

      await userController.migrate(req, res);

      expect(res.status).toHaveBeenCalledWith(CODE.CREATED);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: MESSAGE.REGISTRATION_SUCCESS,
        data: result,
      });
    })

    test('failed', async () => {
      userService.migrate.mockRejectedValueOnce(wrap.result(CODE.INTERNAL_SERVER_ERROR, MESSAGE.FAILED));

      await userController.migrate(req, res);

      expect(res.status).toHaveBeenCalledWith(CODE.INTERNAL_SERVER_ERROR);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: MESSAGE.FAILED,
      });
    })
  });
});