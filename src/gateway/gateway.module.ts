import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { ChatService } from '../chat/chat.service';

@Module({
  providers: [GatewayController, ChatService],
})
export class GatewayModule {}
