// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import {
  listUsersStub,
  loginReturnStub,
  messageReturnStub,
  signupReturnStub,
  UserReturnStub,
} from '../test/stubs/user.stub';

export const UserService = jest.fn().mockReturnValue({
  login: jest.fn(),
  signup: jest.fn(dto =>{
    return {
      ...dto
    }
  }),
  deleteUser: jest.fn().mockResolvedValue(messageReturnStub()),
  listUsers: jest.fn().mockResolvedValue(listUsersStub()),
  getUser: jest.fn().mockResolvedValue(UserReturnStub()),
  getUserById: jest.fn().mockResolvedValue(messageReturnStub()),
});
