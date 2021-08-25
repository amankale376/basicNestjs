import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class SignupDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'name' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'username' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ type: String, description: 'email' })
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @ApiProperty({ type: String, description: 'password' })
  password: string;
}
