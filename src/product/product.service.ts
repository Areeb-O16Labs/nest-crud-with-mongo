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
    private readonly ProductModel: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    try {
      let product = new Product();
      product.productName = createProductDto.productName;
      product.category = createProductDto.category as any;
      await this.ProductModel.save(product);
      // const Product = new Product();
      return customResponseHandler(product, 'Product created successfully');
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async findAll() {
    try {
      const users = await this.ProductModel.createQueryBuilder('product')
        .leftJoinAndSelect('product.category', 'category')
        .getMany();
      return customResponseHandler(
        users,
        'All products retrieved successfully',
      );
    } catch (err) {
      console.log(err, 'err');

      throw new InternalServerErrorException(err.message);
    }
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
