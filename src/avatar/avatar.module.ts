import { BadRequestException, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AvatarController } from './avatar.controller';
import {diskStorage} from 'multer'

@Module({
  imports:[MulterModule.register( {
    storage:diskStorage({
      destination:'./uploads',
      filename(req, file, cb){
        cb(null,Date.now()+'-'+file.originalname )
      },
     
    }
    ),
    fileFilter(req, file, cb){
      if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){ 
         const name =  file.originalname  
         var ext = name.split('.').pop()
          return cb(new BadRequestException("file uploaded is of type "+ext), false)
      }
      cb(undefined,true)
   } 
})
  ],
  controllers: [AvatarController],
  providers: []
})
export class AvatarModule {}
