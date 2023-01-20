import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { GroupService } from './group.service';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { Request } from 'express';
import { GroupCreatorDto } from './dto/group.dto';

@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @UseGuards(JwtGuard)
  @Post('create')
  async createGroup(@Body() dto: GroupCreatorDto, @Req() req: Request) {
    return this.groupService.createGroup(dto, req.user.id);
  }

  @UseGuards(JwtGuard)
  @Get('all')
  async getGroupsByUserId(@Req() req: Request) {
    return this.groupService.getAllGroupsByUserId(req.user.id);
  }
}
