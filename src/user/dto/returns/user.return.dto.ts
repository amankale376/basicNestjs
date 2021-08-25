import { IsString } from 'class-validator';
export class UserReturnDto {
  @IsString()
  name: string;
  @IsString()
  username: string;
  @IsString()
  email: string;
}
