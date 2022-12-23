import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GroupService {
  
  constructor(
    private prisma: PrismaService
  ) {}
  
  getChatsByGroupId() {
    return this.prisma.chat.findMany({
      select: {
        user: { select: { username: true, id: true } },
        message: true,
        createdAt: true
      }
    });
  }
}
