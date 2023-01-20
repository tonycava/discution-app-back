import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ChatDto, LimitQuery } from './dto/chat.dto';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  getChatsByGroupId({ start, end, groupId }: LimitQuery) {
    return this.prisma.chat.findMany({
      skip: start,
      take: end - start,
      // select: { message: true, createdAt: true, userId: true, id: true, user: { select: { username: true } } },
      orderBy: { createdAt: 'desc' },
      where: { groupId },
    });
  }

  addChat({ message, userId, groupId }: ChatDto) {
    return this.prisma.chat.create({
      data: {
        message,
        user: { connect: { id: userId } },
        group: { connect: { id: groupId, },
        },
      },
    });
  }
}
