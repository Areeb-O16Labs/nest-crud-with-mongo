import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { customResponseHandler } from 'src/config/helpers';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly ProductService: Repository<Product>,
  ){}
  async create(createProductDto: CreateProductDto) {
    try {
      
      let user; 
      // user = await this.ProductService.create();
      // const Product = new Product();
      // return customResponseHandler(user, 'Category created successfully');
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: string) {
    return `This action returns a #${id} product`;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: string) {
    return `This action removes a #${id} product`;
  }
}
