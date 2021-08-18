import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
// import { User , UserSchema } from './user.model';
import { UserService , } from './user.service';
import { userProviders } from './user.providers'; 
import { DatabaseModule } from '../database/database.module';
@Module({
  imports:[DatabaseModule],
  controllers: [UserController],
  providers: [...userProviders,UserService]
})
export class UserModule {}
