import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
export declare class WebSocketsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    wss: Server;
    SocketID: string;
    UserID: number;
    private logger;
    handleDisconnect(client: Socket): Promise<void>;
    handleConnection(client: Socket): Promise<void>;
}
