import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { getRepository } from 'typeorm';
import { Sockets } from '../user/user.entity';

@WebSocketGateway()
export class WebSocketsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;
  SocketID: string;
  UserID: number;

  private logger: Logger = new Logger('AppGateway');

  async handleDisconnect(client: Socket): Promise<void> {
    try {
      this.logger.log('Client Disconnected : ' + client.id);
      await getRepository(Sockets).delete({ ClientId: client.id });
    } catch (error) {
      this.logger.log(error);
    }
  }

  async handleConnection(client: Socket): Promise<void> {
    this.logger.log('Client Connection ' + client.id);
    this.SocketID = client.id;
    client.on('user', async (user) => {
      await getRepository(Sockets).insert({
        userId: user.id,
        ClientId: client.id,
      });
    });
  }
}
