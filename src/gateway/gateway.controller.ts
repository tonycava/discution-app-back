import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatService } from '../chat/chat.service';
import { ChatDto } from '../chat/dto/chat.dto';

@WebSocketGateway({
  cors: true,
})
export class GatewayController {
  constructor(private chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', () => {
      console.log('New client connected');
    });

    this.server.on('disconnect', () => {
      console.log('Client disconnected');
    });
  }

  @SubscribeMessage('message')
  async onNewMessage(@MessageBody() data: ChatDto) {
    const chat = await this.chatService.addChat(data);
    this.server.emit('newChat', chat);
  }
}
