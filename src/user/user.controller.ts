import {
  Controller,
  Post,
  Body,
  Delete,
  Get,
  Render,
  Param,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { Token } from './token.decorator';
import { UserService } from './user.service';
import { QueryDto } from './dto/query.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginReturnDto } from './dto/returns/login-return.dto';
import { SignupReturnDto } from './dto/returns/signup-return.dto';
import { MessageReturnDto } from './dto/returns/message-return.dto';
import { UserReturnDto } from './dto/returns/user.return.dto';
@Controller('/')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({ description: 'User Login' })
  @ApiUnauthorizedResponse({ description: 'Invalid Credentials' })
  @ApiBody({ type: LoginDto })
  @Post('login')
  login(@Body() user: LoginDto): Promise<LoginReturnDto> {
    return this.userService.login(user);
  }

  @ApiBody({ type: SignupDto })
  @ApiCreatedResponse({ description: 'User registeration' })
  @Post('signup')
  signup(@Body() user: SignupDto): Promise<SignupReturnDto> {
    return this.userService.signup(user);
  }
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'User deletion' })
  @Delete('deleteUser')
  deleteUser(@Token() token): Promise<MessageReturnDto> {
    return this.userService.deleteUser(token);
  }
  @Post('users')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Listing Users' })
  @ApiBody({ type: QueryDto })
  listUsers(@Token() token, @Body() query: QueryDto): Promise<UserReturnDto[]> {
    return this.userService.listUsers(token, query);
  }

  @Get('feed/:id')
  @Render('feed')
  getFeed(@Param('id') param) {
    return { param };
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'User information' })
  @Get('user')
  getUser(@Token() token: any): Promise<UserReturnDto> {
    return this.userService.getUser(token);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'get Particular User by Id ' })
  @Get('user/:id')
  @ApiParam({ name: 'id', type: 'number' })
  getUserById(
    @Token() Token,
    @Param('id') id: number,
  ): Promise<MessageReturnDto> {
    return this.userService.getUserById(Token, id);
  }
}
