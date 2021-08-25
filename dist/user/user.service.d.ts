import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { Repository } from 'typeorm';
import { User, Sockets } from './user.entity';
import { WebSocketsGateway } from 'src/web-socket/web-socket.gateway';
import { QueryDto } from './dto/query.dto';
import { LoginReturnDto } from './dto/returns/login-return.dto';
import { SignupReturnDto } from './dto/returns/signup-return.dto';
import { UserReturnDto } from './dto/returns/user.return.dto';
import { MessageReturnDto } from './dto/returns/message-return.dto';
export declare class UserService {
    private userRepository;
    private socketsRepository;
    private readonly webSocketGateway;
    constructor(userRepository: Repository<User>, socketsRepository: Repository<Sockets>, webSocketGateway: WebSocketsGateway);
    login(body: LoginDto): Promise<LoginReturnDto>;
    signup(body: SignupDto): Promise<SignupReturnDto>;
    deleteUser(Token: any): Promise<MessageReturnDto>;
    listUsers(Token: any, query: QueryDto): Promise<UserReturnDto[]>;
    getUser(Token: {
        id: any;
    }): Promise<UserReturnDto>;
    getUserById(Token: any, id: number): Promise<MessageReturnDto>;
    private getMatch;
    private checkDuplicate;
    private generateToken;
}
