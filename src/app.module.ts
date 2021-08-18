require('dotenv').config()
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { Auth } from './common/middleware/auth.middleware';
// import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

// MongooseModule.forRoot(process.env.MONGOOSE_CONNECT),

@Module({
  imports: [ 
   UserModule],
  controllers: [],
  providers: [],
})

export class AppModule implements NestModule{
  configure(consumer:MiddlewareConsumer){
    consumer.apply(Auth)
    .forRoutes({ path:'/signup', method:RequestMethod.POST })
  }
}
