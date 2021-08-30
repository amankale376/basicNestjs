import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
  @ApiProperty({ type: String, description: 'username' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ type: String, description: 'password' })
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
