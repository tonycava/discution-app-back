import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ChatDto } from './dto/chat.dto';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  getChats() {
    return this.prisma.chat.findMany({
      select: {
        message: true,
        userId: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

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
