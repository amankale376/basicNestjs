import { Model } from 'mongoose';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { UserDocument } from './user.model';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
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
    listUsers(Token: any, query: any): Promise<UserDocument[]>;
    getUser(Token: any): Promise<{
        user: UserDocument;
    }>;
    private getMatch;
    private checkDuplicate;
    private generateToken;
}
