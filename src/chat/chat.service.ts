import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ChatDto, Limit } from './dto/chat.dto';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}
  
  getChats({ start, end }: Limit) {
    return this.prisma.chat.findMany({
      skip: +start,
      take: +end,
      select: {
        message: true,
        userId: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }
  
  addChat({ message, userId }: ChatDto) {
    return this.prisma.chat.create({
      data: {
        message,
        user: {
          connect: { id: userId }
        },
        group: {
          connect: { id: '7035ae37-f630-4697-ab17-4d516eaba7d7' }
        }
      }
    });
  }
}
