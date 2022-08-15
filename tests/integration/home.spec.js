// import app
const supertest = require('supertest');
const app = require('../../app');
const { CODE, MESSAGE } = require('../../libs/constant');

// create test instance
const request = supertest(app);

describe('home', () => {
  it('success', async () => {
    const response = await request.get('/');
  
    expect(response.status).toBe(CODE.OK);
    expect(response.body.message).toBe(MESSAGE.SERVER_OK);
  })
});