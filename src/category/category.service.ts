import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { customResponseHandler } from 'src/config/helpers';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryService: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const user = await this.categoryService.save(createCategoryDto);
      return customResponseHandler(user, 'Category created successfully');
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async findAll() {
    try {
      const data = await this.categoryService.find();
      return customResponseHandler(
        data,
        'All categories retrieved successfully',
      );
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.categoryService.findOne({
        where: { categoryId: id },
      });
      return customResponseHandler(user, 'Category retrieved successfully');
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      let user = await this.categoryService.findOne({
        where: { categoryId: id },
      });
      user.name = updateCategoryDto.name || user.name;
      user.isActive =
        updateCategoryDto.isActive !== undefined
          ? updateCategoryDto.isActive
          : user.isActive;
      user = await this.categoryService.save(user);
      return customResponseHandler(user, 'Category updated successfully');
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  remove(id: string) {
    try {
      const user = this.categoryService.delete({ categoryId: id });
      return customResponseHandler(user, 'Category deleted successfully');
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
