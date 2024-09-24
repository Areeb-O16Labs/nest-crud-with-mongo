import { Module } from '@nestjs/common';
import { OwnerController } from './owner.controller';
import { OwnerService } from './owner.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Owner, OwnerSchema } from './schemas/owner.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Owner.name, schema: OwnerSchema }])],
  controllers: [OwnerController],
  providers: [OwnerService]
})
export class OwnerModule {}
