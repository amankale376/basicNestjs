import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sockets, User } from '../user/user.entity';
import { WebSocketsGateway } from '../web-socket/web-socket.gateway';
import { Repository } from 'typeorm';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Sockets)
    private socketsRepository: Repository<Sockets>,
    private readonly webSocketGateway: WebSocketsGateway,
  ) {}

  getUserDbHandle(): Repository<User> {
    return this.userRepository;
  }
  getSocketsDbHandle(): Repository<Sockets> {
    return this.socketsRepository;
  }
}
