import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'
export class SignupDto{
    @IsNotEmpty()
    name:string;
    @IsNotEmpty()
    username:string;
    @IsNotEmpty()
    @IsEmail()
    email:string;
    @IsNotEmpty()
    @MinLength(8)
    password:string;
}