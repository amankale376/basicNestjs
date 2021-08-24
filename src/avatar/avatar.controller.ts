
import { BadRequestException, Controller, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiParam } from '@nestjs/swagger';
import {Express} from 'express'

@Controller('avatar')
export class AvatarController {

@Post('upload')
 @UseInterceptors(FileInterceptor('file'))
uploadFile(@UploadedFile() file) {
    const name =  file.originalname  
    var ext = name.split('.').pop()
return {
    filename:file.name,
    message: ext+" file is uploaded!"
}
}

}
