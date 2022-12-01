import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ChatDto } from './dto/chat.dto';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  addChat({ message, userId }: ChatDto) {
    return this.prisma.chat.create({
      data: {
        message,
        userId,
      },
      select: {
        message: true,
        userId: true,
      },
    });
  }
}
