import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {

  @UseGuards(JwtGuard)
  @Get('is-ok')
  isOk() {
    return { message: 'Authorized' };
  }

  @UseGuards(JwtGuard)
  @Get('me')
  me(@GetUser() user: User) {
    console.log('la');
    return user;
  }
}
