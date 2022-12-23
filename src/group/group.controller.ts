import { Body, Controller, Get } from '@nestjs/common';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService) {}
  
  @Get('')
  async login(@Body() dto: any) {
    return this.groupService.getChatsByGroupId();
  }
}
