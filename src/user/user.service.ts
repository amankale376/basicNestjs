// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { User, Sockets } from './user.entity';
import { WebSocketsGateway } from '../web-socket/web-socket.gateway';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryDto } from './dto/query.dto';
import { LoginReturnDto } from './dto/returns/login-return.dto';
import { SignupReturnDto } from './dto/returns/signup-return.dto';
import { UserReturnDto } from './dto/returns/user.return.dto';
import { MessageReturnDto } from './dto/returns/message-return.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Sockets)
    private socketsRepository: Repository<Sockets>,
    private readonly webSocketGateway: WebSocketsGateway,
  ) {}

  async login(body: LoginDto): Promise<LoginReturnDto> {
    try {
      const user = await this.userRepository.findOne({
        where: { username: body.username },
      });
      if (!user) {
        throw new NotFoundException('User not found!');
      }
      const isMatch = await bcrypt.compare(body.password, user.password);
      if (!isMatch) {
        throw new ForbiddenException('Authorization failed');
      }
      const token = this.generateToken(user.id);

      await this.userRepository.save(user);
      return {
        message: 'Login Success',
        token: token,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async signup(body: SignupDto): Promise<SignupReturnDto> {
    try {
      const check = await this.checkDuplicate(body);
      if (check) {
        throw new ForbiddenException('username is not Available');
      }
      const newuser = new User();
      newuser.name = body.name;
      newuser.username = body.username;
      newuser.email = body.email;
      newuser.password = body.password;

      const user = await this.userRepository.save(newuser);
      return {
        username: user.username,
        email: user.email,
        message: 'New user created!',
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async deleteUser(Token): Promise<MessageReturnDto> {
    await this.getMatch(Token);
    try {
      const deleteUser = await this.userRepository.delete({ id: Token.id });
      if (deleteUser) {
        return {
          message: 'user is deleted',
        };
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async listUsers(Token: any, query: QueryDto): Promise<UserReturnDto[]> {
    await this.getMatch(Token);
    const page = query.page || 1;
    const limit = query.limit || 5;
    const skip = (page - 1) * limit;
    try {
      const users = await this.userRepository.find({
        select: ['name', 'username', 'email'],
        order: { id: 'ASC' },
        skip: skip,
        take: limit,
      });
      if (users.length === 0) {
        throw new NotFoundException('user not found');
      } else {
        return users;
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getUser(Token): Promise<UserReturnDto> {
    await this.getMatch(Token);
    try {
      const user = await this.userRepository.findOne({
        where: { id: Token.id },
        select: ['name', 'username', 'email'],
      });
      if (user) {
        return user;
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getUserById(Token: any, id: number): Promise<MessageReturnDto> {
    const match = await this.getMatch(Token);
    try {
      const user = await this.socketsRepository.findOne({
        where: { userId: id },
      });
      if (user.ClientId) {
        this.webSocketGateway.wss.emit(
          'message',
          match.name + ' view your details',
        );
      }
      return {
        message: 'You viewed details',
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  private async getMatch(Token) {
    try {
      const match = await this.userRepository.findOne({
        where: { id: Token.id },
      });
      if (match) {
        return match;
      }
      throw new UnauthorizedException('Authentication Failed');
    } catch (error) {}
  }

  private async checkDuplicate(body: any) {
    const match = await this.userRepository.findOne({
      where: { username: body.username },
    });
    return match;
  }

  private generateToken(id: any) {
    return jwt.sign({ id: id }, process.env.SECRET, { expiresIn: '1hr' });
  }
}
