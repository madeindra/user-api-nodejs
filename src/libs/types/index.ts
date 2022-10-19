// import type
import { Request } from 'express';

// type declaration
export interface Result {
  code: number;
  message: string;
  data?: any;
  meta?: any;
}

export interface UserData extends User {
  _id?: string;
  id?: string;
}

export interface User {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  roles?: string[];
  isDeleted?: boolean;
  isVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RequestUser extends Request {
  user?: any;
}