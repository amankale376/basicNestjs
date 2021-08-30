import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { WebSocketModule } from '../web-socket/web-socket.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sockets, User } from './user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, Sockets]), WebSocketModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
