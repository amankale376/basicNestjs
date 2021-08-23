import { Inject, Logger, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@WebSocketGateway()

export class UserGateway implements OnGatewayConnection, OnGatewayDisconnect{

  @WebSocketServer() wss:Server

  constructor(
    @Inject('USER_REPOSITORY')
    private userModel: Repository<User>,
  ) {}

   SocketID:string;
   UserID:number;

  private logger :Logger = new Logger('AppGateway')


  async handleDisconnect(client:Socket){
    this.logger.log("Client Disconnected : "+client.id)
    const user = await this.userModel.findOne({where:{status:client.id}})
    user.status = "offline"
    await this.userModel.save(user)
  }

 async handleConnection(client:Socket){
    this.logger.log("Client Connection "+client.id)
    this.SocketID = client.id
  }

  @SubscribeMessage('user')
  async handleId(client:Socket, id:string){
    this.UserID = parseInt(id) 
    const user = await this.userModel.findOne({where:{id:id}})
    user.status = this.SocketID
    const viewers =JSON.parse(user.viewers)

    if(viewers.length > 0){
      this.wss.emit('message', viewers)
    }else{
      this.wss.emit('message',["No Viewers"])
    }
    await this.userModel.save(user)
  }
}
