import { LoginDto } from 'src/user/dto/login.dto';

import { LoginReturnDto } from 'src/user/dto/returns/login-return.dto';
import { MessageReturnDto } from 'src/user/dto/returns/message-return.dto';
import { SignupReturnDto } from 'src/user/dto/returns/signup-return.dto';
import { UserReturnDto } from 'src/user/dto/returns/user.return.dto';
import { SignupDto } from 'src/user/dto/signup.dto';

export const loginReturnStub = (): LoginReturnDto => {
  return {
    message: 'this is a sample message',
    token: 'asdasdas11233345afasdas',
  };
};

export const loginStub = (): LoginDto => {
  return {
    username: 'aman',
    password: 'password',
  };
};

export const signupStub = (): SignupDto => {
  return {
    email: 'aman@gmail.com',
    name: 'aman',
    password: 'password',
    username: 'aman',
  };
};
export const signupReturnStub = (): SignupReturnDto => {
  return {
    username: 'aman',
    email: 'aman@gmail.com',
    message: 'New user created!',
  };
};
export const messageReturnStub = (): MessageReturnDto => {
  return {
    message: 'This is a return message from stub',
  };
};
export const listUsersStub = () => {
  return [
    {
      name: 'aman',
      username: 'aman',
      email: 'aman@gmail.com',
      password: 'password',
    },
    {
      name: 'mohit',
      username: 'mohit',
      email: 'mohit@gmail.com',
      password: 'password',
    },
    {
      name: 'rahul',
      username: 'rahul',
      email: 'rahul@gmail.com',
      password: 'password',
    },
  ];
};
export const retrunListUsersStub = (): UserReturnDto[] => {
  return [
    {
      name: 'aman',
      username: 'aman',
      email: 'aman@gmail.com',
    },
  ];
};
export const UserReturnStub = (): UserReturnDto => {
  return {
    name: 'aman',
    username: 'aman',
    email: 'aman@gmail.com',
  };
};
