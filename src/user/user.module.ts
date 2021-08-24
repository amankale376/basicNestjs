import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
// import { User , UserSchema } from './user.model';
import { UserService , } from './user.service';
import { WebSocketModule } from 'src/web-socket/web-socket.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sockets, User } from './user.entity';
@Module({
  imports:[TypeOrmModule.forFeature([User, Sockets]), WebSocketModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
