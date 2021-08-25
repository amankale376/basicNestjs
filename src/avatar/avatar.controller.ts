import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

@Controller('avatar')
export class AvatarController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: any) {
    const name = file.originalname;
    const ext = name.split('.').pop();
    return {
      filename: file.name,
      message: ext + ' file is uploaded!',
    };
  }
}
