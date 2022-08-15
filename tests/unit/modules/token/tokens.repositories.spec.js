// import mock
const { mockRequest, mockResponse } = require('../../../mock');

const tokenRepository = require('../../../../modules/tokens/tokens.repositories');

const db = require('../../../../libs/db');

// mock libraries
jest.mock('../../../../libs/db', () => ({
  insertOne: jest.fn(),
  findOne: jest.fn(),
})
);

describe('token repository', () => {
  describe('insertOne', () => {
    const document = {
      id: '5dbafa36-c300-4896-85dc-5a8cb1ff7da2',
      email: 'user@usedeall.com',
      username: 'user',
      roles: ['user'],
      isDeleted: false,
      isVerified: true,
      createdAt: new Date('01-01-2000'),
      updatedAt: new Date('01-01-2000'),
    }

    const result = {
      acknowledged : true,
    }

    test('succeed', async () => {
      db.insertOne.mockResolvedValueOnce(result);

      const res = await tokenRepository.insertOne(document);

      expect(res).toEqual(result);
    });
  });

  describe('findOne', () => {
    const document = {
      id: '5dbafa36-c300-4896-85dc-5a8cb1ff7da2',
    }

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

    test('succeed', async () => {
      db.findOne.mockResolvedValueOnce(result);

      const res = await tokenRepository.findOne(document);

      expect(res).toEqual(result);
    });
  });
});