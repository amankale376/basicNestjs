import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UserService {
    private userModel;
    constructor(userModel: Repository<User>);
    login(body: LoginDto): Promise<{
        message: string;
        token: string;
    }>;
    signup(body: SignupDto): Promise<{
        username: string;
        email: string;
        message: string;
    }>;
    deleteUser(Token: any): Promise<{
        id: string;
        message: string;
    }>;
    listUsers(Token: any, query: any): Promise<User[]>;
    getUser(Token: any): Promise<{
        user: User;
    }>;
    private getMatch;
    private checkDuplicate;
    private generateToken;
}
