import { IsString } from 'class-validator';
export class LoginReturnDto {
  @IsString()
  message: string;
  @IsString()
  token: string;
}
