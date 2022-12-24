import { Module } from '@nestjs/common';
import { GatewayModule } from './gateway/gateway.module';
import { PrismaModule } from './prisma/prisma.module';
import { ChatModule } from './chat/chat.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { GroupModule } from './group/group.module';
import configuration from './config/configuration';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    GatewayModule,
    PrismaModule,
    ChatModule,
    AuthModule,
    UserModule,
    GroupModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
