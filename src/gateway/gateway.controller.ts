import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatService } from '../chat/chat.service';

@WebSocketGateway()
export class GatewayController {
  constructor(private chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('New client connected');
      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  }

  @SubscribeMessage('newMessage')
  async onNewMessage(@MessageBody() data: string) {
    const count = await this.chatService.count();
    this.server.emit('send', { data, count });
  }
}
