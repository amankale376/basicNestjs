import { IsEmail, IsString } from 'class-validator';

export class SignupReturnDto {
  @IsString()
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  message: string;
}
