import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './config/all-execption';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(new ValidationPipe({transform: true}))
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(8000);
}
bootstrap();
