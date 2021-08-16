import { Controller, Post, Body, Delete, Get, UseGuards, SetMetadata, Param} from '@nestjs/common'
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { Token } from './token.decorator';
import { UserService } from './user.service';

@Controller('/')
export class UserController {
constructor(private readonly userService : UserService){}

@Post('login')
login(@Body() user:LoginDto ):any{
   return this.userService.login(user)
}

@Post('signup')
signup(@Body() user:SignupDto ):any{
return this.userService.signup(user)
}

@Delete('deleteUser')
deleteUser(@Token() token ):any{
return this.userService.deleteUser(token)
}

@Get('users')
listUsers(@Token() token ):any{
return this.userService.listUsers(token)
}

@Get('user')
getUser(@Token() token):any{
      return this.userService.getUser(token)
}
}