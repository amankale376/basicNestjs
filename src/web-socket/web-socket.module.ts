import { Module } from '@nestjs/common';
import { WebSocketsGateway } from './web-socket.gateway';

@Module({
  imports: [],
  providers: [WebSocketsGateway],
  exports: [WebSocketsGateway],
})
export class WebSocketModule {}
