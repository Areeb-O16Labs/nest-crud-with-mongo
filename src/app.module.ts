import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OwnerModule } from './owner/owner.module';
import { env } from 'process';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    CatsModule,
    OwnerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
