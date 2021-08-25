import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { UserService } from './user.service';
import { QueryDto } from './dto/query.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    login(user: LoginDto): any;
    signup(user: SignupDto): any;
    deleteUser(token: any): any;
    listUsers(token: any, query: QueryDto): any;
    getFeed(param: any): {
        param: any;
    };
    getUser(token: any): any;
    getUserById(Token: string, id: number): any;
}
