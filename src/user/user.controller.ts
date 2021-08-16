import { Controller, Post, Body, Delete, Get, Query } from '@nestjs/common'
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { Token } from './token.decorator';
import { UserService } from './user.service';
import { QueryDto } from './dto/query.dto';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger'
@Controller('/')
export class UserController {
constructor(private readonly userService : UserService){}

@ApiOkResponse({description:'User Login'})
@ApiUnauthorizedResponse({description:'Invalid Credentials'})
@ApiBody({type:LoginDto})
@Post('login')
login(@Body() user:LoginDto ):any{
   return this.userService.login(user)
}

@ApiBody({type:SignupDto})
@ApiCreatedResponse({description:'User registeration'})
@Post('signup')
signup(@Body() user:SignupDto ):any{
return this.userService.signup(user)
}
@ApiBearerAuth()
@ApiOkResponse({description:'User deletion'})
@Delete('deleteUser')
deleteUser(@Token() token ):any{
return this.userService.deleteUser(token)
}

@ApiBearerAuth()
@ApiOkResponse({description:'Listing Users'})
@Get('users')
listUsers(@Token() token , @Query() query:QueryDto):any{
return this.userService.listUsers(token, query)
}

@ApiBearerAuth()
@ApiOkResponse({description:'User information'})
@Get('user')
getUser(@Token() token):any{
      return this.userService.getUser(token)
}
}