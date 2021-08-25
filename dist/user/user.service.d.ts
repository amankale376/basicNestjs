import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { Repository } from 'typeorm';
import { User, Sockets } from './user.entity';
import { WebSocketsGateway } from 'src/web-socket/web-socket.gateway';
import { QueryDto } from './dto/query.dto';
export declare class UserService {
    private userRepository;
    private socketsRepository;
    private readonly webSocketGateway;
    constructor(userRepository: Repository<User>, socketsRepository: Repository<Sockets>, webSocketGateway: WebSocketsGateway);
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
        id: number;
        message: string;
    }>;
    listUsers(Token: any, query: QueryDto): Promise<User[]>;
    getUser(Token: {
        id: any;
    }): Promise<{
        user: User;
    }>;
    getUserById(Token: any, id: number): Promise<{
        message: string;
    }>;
    private getMatch;
    private checkDuplicate;
    private generateToken;
}
