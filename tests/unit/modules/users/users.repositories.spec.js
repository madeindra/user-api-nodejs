// import mock
const userRepository = require('../../../../modules/users/users.repositories');

const db = require('../../../../libs/db');

// mock libraries
jest.mock('../../../../libs/db', () => ({
  insertOne: jest.fn(),
  findOne: jest.fn(),
  findOffset: jest.fn(),
  updateOne: jest.fn(),
})
);

describe('user repository', () => {
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

      const res = await userRepository.insertOne(document);

      expect(res).toEqual(result);
    });
  });

  describe('updateOne', () => {
    const condition = {
      id: '5dbafa36-c300-4896-85dc-5a8cb1ff7da2',
    };

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
      db.updateOne.mockResolvedValueOnce(result);

      const res = await userRepository.updateOne(condition, document);

      expect(res).toEqual(result);
    });
  });

  describe('findOne', () => {
    const condition = {
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

      const res = await userRepository.findOne(condition);

      expect(res).toEqual(result);
    });
  });

  describe('findOffset', () => {
    const condition = {
      id: '5dbafa36-c300-4896-85dc-5a8cb1ff7da2',
    }

    const result = [{
      id: '5dbafa36-c300-4896-85dc-5a8cb1ff7da2',
      email: 'user@usedeall.com',
      username: 'user',
      roles: ['user'],
      isDeleted: false,
      isVerified: true,
      createdAt: new Date('01-01-2000'),
      updatedAt: new Date('01-01-2000'),
    }];

    test('succeed', async () => {
      db.findOffset.mockResolvedValueOnce(result);

      const res = await userRepository.findOffset(condition, {}, {}, 1, 1);

      expect(res).toEqual(result);
    });
  });
});