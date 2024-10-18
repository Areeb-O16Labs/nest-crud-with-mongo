// cats.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  HttpStatus,
  Patch,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@Controller('cats')
@ApiTags('cats')

export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async findAll(@Res() res: Response) {
    const data = await this.catsService.findAll();
    res.status(HttpStatus.OK).json({
      success: true,
      data: data,
      message: 'All cats retrieved successfully',
    });
  }

  @Post()
  async create(@Res() res: Response, @Body() cat: { id: string; name: string }) {
    const data = await this.catsService.create(cat);
    if (data) {
      res.status(HttpStatus.CREATED).json({
        success: true,
        data: data,
        message: 'Cat created successfully',
      });
    } else {
        throw new BadRequestException('Cat not created');
    }
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    const data = await this.catsService.findOne(id);
    if (data) {
      res.status(HttpStatus.OK).json({
        success: true,
        data: data,
        message: 'Cat retrieved successfully',
      });
    } else {
        throw new BadRequestException('Cat not found');
    }
  }

  @Patch(':id')
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() cat: { id: string; name: string },
  ) {
    const data = await this.catsService.update(id, cat);
    if (data) {
      res.status(HttpStatus.OK).json({
        success: true,
        data: data,
        message: 'Cat updated successfully',
      });
    } else {
        throw new BadRequestException('Cat not updated');
    }
  }

  @Delete(':id')
  async delete(@Res() res: Response, @Param('id') id: string) {
    const data = await this.catsService.delete(id);
    if (data) {
      res.status(HttpStatus.OK).json({
        success: true,
        data: data,
        message: 'Cat deleted successfully',
      });
    } else {
        throw new BadRequestException('Cat not deleted');
    }
  }
}
