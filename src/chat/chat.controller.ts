import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { ChatService } from './chat.service';
import { Request } from 'express';
import { Limit } from './dto/chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}


  @UseGuards(JwtGuard)
  @Get()
  getChat(@Req() req: Request, @Query() query: Limit) {
    console.log(query);
    return this.chatService.getChats(query);
  }
}
