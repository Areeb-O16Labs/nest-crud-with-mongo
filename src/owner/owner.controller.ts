import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { OwnerService } from './owner.service';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@Controller('owner')
@ApiTags('owner')

export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Get()
  async findAll(@Res() res: Response) {
    const data = await this.ownerService.findAll();
    res.status(HttpStatus.OK).json({
      success: true,
      data: data,
      message: 'All owners retrieved successfully',
    });
  }

  @Post()
  async create(
    @Res() res: Response,
    @Body() owner: { name: string; age: number },
  ) {
    const createdOwner = await this.ownerService.create(owner);
    if (createdOwner) {
      res.status(HttpStatus.CREATED).json({
        success: true,
        data: createdOwner,
        message: 'Owner created successfully',
      });
    } else {
      throw new BadRequestException('Owner not created');
    }
  }
}
