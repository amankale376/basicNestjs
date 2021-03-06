// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './common/middleware/auth.middleware';
import { UserModule } from './user/user.module';
import { join } from 'path';
import { WebSocketModule } from './web-socket/web-socket.module';
import { AvatarModule } from './avatar/avatar.module';
import { DatabaseModule } from './database/database.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'nestjsusers',
      synchronize: true,
      entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
    }),
    UserModule,
    WebSocketModule,
    AvatarModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Auth)
      .forRoutes({ path: '/signup', method: RequestMethod.POST });
  }
}
