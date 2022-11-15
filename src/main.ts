import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));

  const port = app.get(ConfigService).get('PORT');
  await app.listen(port);
  Logger.log(`Listening on http://localhost:${port}`);
}

bootstrap();
