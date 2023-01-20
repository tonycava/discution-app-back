import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from '../chat/chat.service';
import { OnModuleInit } from '@nestjs/common';
import { ChatDto } from '../chat/dto/chat.dto';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000', 'https://koomei.tonycava.dev'],
    credentials: true
  },
  transports: ['websocket', 'polling'],
  credentials: true
})
export class GatewayController implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  constructor(private chatService: ChatService) {}

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('New client connected');
      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  }

  @SubscribeMessage('changeRoom')
  async onchangeRoom(
    @MessageBody() room: string,
    @ConnectedSocket() client: Socket
  ) {
    client.join(room);
  }

  @SubscribeMessage('newMessage')
  async onNewMessage(
    @MessageBody() data: ChatDto
  ) {
    console.log('new message');
    const chat = await this.chatService.addChat(data);
    this.server.to(data.groupId).emit('newChat', chat);
  }
}
