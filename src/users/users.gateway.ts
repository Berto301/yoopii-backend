import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import { Logger } from '@nestjs/common';
  
  @WebSocketGateway({ namespace: 'agents' }) 
  export class UsersGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('UsersGateway');
  
    afterInit(server: Server) {
      this.logger.log('Init');
    }
  
    handleConnection(client: Socket, ...args: any[]) {
      this.logger.log(`Client connected: ${client.id}`);
    }
  
    handleDisconnect(client: Socket) {
      this.logger.log(`Client disconnected: ${client.id}`);
    }
  
    // You can define more message handlers here
  }