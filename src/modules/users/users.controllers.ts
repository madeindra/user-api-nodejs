// import types
import { Request, Response } from 'express';
import { RequestUser } from '../../libs/types';

// import dependencies
import service from './users.services';
import response from '../../libs/response';

async function register(req: Request, res: Response) {
  // deconstruct body
  const { body } = req;

  // pass to service
  let result;
  try {
    result = await service.register(body);
  } catch (err: any) {
    return response.send(res, err);
  }

  // return result
  return response.send(res, result);
}

async function login(req: Request, res: Response) {
  // deconstruct body
  const { body } = req;

  // pass to service
  let result;
  try {
    result = await service.login(body);
  } catch (err: any) {
    return response.send(res, err);
  }

  // return result
  return response.send(res, result);
}

async function getProfile(req: RequestUser, res: Response) {
  // deconstruct body from bearer middleware
  const { user } = req;

  // pass to service
  let result;
  try {
    result = await service.getProfile(user);
  } catch (err: any) {
    return response.send(res, err);
  }

  // return result
  return response.send(res, result);
}

async function createUser(req: Request, res: Response) {
  // deconstruct body
  const { body } = req;

  // pass to service
  let result;
  try {
    result = await service.createUser(body);
  } catch (err: any) {
    return response.send(res, err);
  }

  // return result
  return response.send(res, result);
}

async function readAllUsers(req: Request, res: Response) {
  // deconstruct param & query
  const { query } = req;

  // pass to service
  let result;
  try {
    result = await service.readAllUsers(query);
  } catch (err: any) {
    return response.send(res, err);
  }

  // return result
  return response.send(res, result);
}

async function readOneUser(req: Request, res: Response) {
  // deconstruct param
  const { params: { id } } = req;

  // pass to service
  let result;
  try {
    result = await service.readOneUser(id);
  } catch (err: any) {
    return response.send(res, err);
  }

  // return result
  return response.send(res, result);
}

async function updateUser(req: Request, res: Response) {
  // deconstruct param & body
  const { params: { id }, body } = req;

  // pass to service
  let result;
  try {
    result = await service.updateUser(id, body);
  } catch (err: any) {
    return response.send(res, err);
  }

  // return result
  return response.send(res, result);
}

async function deleteUser(req: Request, res: Response) {
  // deconstruct param
  const { params: { id } } = req;

  // pass to service
  let result;
  try {
    result = await service.deleteUser(id);
  } catch (err: any) {
    return response.send(res, err);
  }

  // return result
  return response.send(res, result);
}

async function migrate(_req: Request, res: Response) {
  // pass to service
  let result;
  try {
    result = await service.migrate();
  } catch (err: any) {
    return response.send(res, err);
  }

  // return result
  return response.send(res, result);
}

export default {
  register,
  login,
  getProfile,
  createUser,
  readAllUsers,
  readOneUser,
  updateUser,
  deleteUser,
  migrate,
};
