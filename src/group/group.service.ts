import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GroupCreatorDto } from "./dto/group.dto";

@Injectable()
export class GroupService {

  constructor(
    private prisma: PrismaService,
  ) {}

  createGroup({ groupName }: GroupCreatorDto, userId: string) {
    return this.prisma.group.create({
      data: {
        name: groupName,
        users: { connect: { id: userId } },
      },
    });
  }

  getAllGroupsByUserId(userId: string) {
    return this.prisma.group.findMany({
      select: { name: true, id: true },
      where: {
        users: { some: { id: userId } },
      },
    });
  }
}
