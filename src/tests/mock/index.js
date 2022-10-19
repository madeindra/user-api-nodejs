// mock request with custom data
function mockRequest(body, user, header, params, query){
  return {
    body,
    user,
    header,
    params,
    query,
  }
}

// mock response with jest because it will be checked using expect
function mockResponse() {
  const res = {};

  res.send = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);

  return res;
}

// mock next with jest
function mockNext() {
  return jest.fn();
} 

module.exports = {
  mockRequest,
  mockResponse,
  mockNext,
}