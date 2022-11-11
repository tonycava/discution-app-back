import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async login(body: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: body.username,
      }
    });
    const valid = await argon.verify(user?.hash, body?.password);
    if (!valid || user) throw new ForbiddenException('Invalid credentials');
    return this.signToken(user.id, user.username);
  }

  async register(body: AuthDto) {
    const hash = await argon.hash(body.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          username: body.username,
          hash,
        },
      });

      return this.signToken(user.id, user.username);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') throw new ForbiddenException(
          'Credentials taken',
        );
      }
      throw error;
    }
  }

  async signToken(userId: string, username: string) {
    const payload = {
      sub: userId,
      username,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, { secret, expiresIn: '3d' });

    return {
      access_token: token,
    };
  }
}
