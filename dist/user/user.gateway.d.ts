import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UserGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private userModel;
    wss: Server;
    constructor(userModel: Repository<User>);
    SocketID: string;
    UserID: number;
    private logger;
    handleDisconnect(client: Socket): Promise<void>;
    handleConnection(client: Socket): Promise<void>;
    handleId(client: Socket, id: string): Promise<void>;
}
