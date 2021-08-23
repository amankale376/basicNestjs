import { Controller, Post, Body, Delete, Get, Query, Render, Param } from '@nestjs/common'
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { Token } from './token.decorator';
import { UserService } from './user.service';
import { QueryDto } from './dto/query.dto';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiUnauthorizedResponse } from '@nestjs/swagger'
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
@Post('users')
@ApiBearerAuth()
@ApiOkResponse({description:'Listing Users'})
@ApiBody({type:QueryDto})
listUsers(@Token() token , @Body() query:QueryDto):any{
return this.userService.listUsers(token, query)
}

@Get('feed/:id')
@Render('feed')
getFeed(@Param('id') param){
      return {param};
}

@ApiBearerAuth()
@ApiOkResponse({description:'User information'})
@Get('user')
getUser(@Token() token):any{
      return this.userService.getUser(token)
}

@ApiBearerAuth()
@ApiOkResponse({description:'get Particular User by Id '})
@ApiParam({name:'Param' ,type:'String'})
@Get('user/:Param')
getUserById(@Token() Token , @Param('Param') id:string):any{
      return this.userService.getUserById(Token , id )
}

}