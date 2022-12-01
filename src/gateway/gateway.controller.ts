import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatService } from '../chat/chat.service';
import { ChatDto } from '../chat/dto/chat.dto';

@WebSocketGateway({
  cors: true,
})
export class GatewayController {
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

  @SubscribeMessage('newMessage')
  async onNewMessage(@MessageBody() data: ChatDto) {
    const chat = await this.chatService.addChat(data);
    this.server.emit('newChat', chat);
  }
}
