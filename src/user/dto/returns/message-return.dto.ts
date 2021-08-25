import { IsString } from 'class-validator';

export class MessageReturnDto {
  @IsString()
  message: string;
}
