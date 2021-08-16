import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    login(user: LoginDto): any;
    signup(user: SignupDto): any;
    deleteUser(token: any): any;
    listUsers(token: any): any;
    getUser(token: any): any;
}
