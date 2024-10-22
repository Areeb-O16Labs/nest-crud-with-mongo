import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { checkPassword, customResponseHandler, hashPassword } from 'src/config/helpers';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userModel: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      console.log('innnnn');
      createUserDto.password = await hashPassword(createUserDto.password);
      const exsistingUser = await this.existingUserBy(
        'email',
        createUserDto.email,
      );
      if (exsistingUser) {
        throw new InternalServerErrorException('user already exist');
      }
      const user = await this.userModel.save(createUserDto);
      return customResponseHandler(user, 'User created successfully');
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async findAll() {
    try {
      let users;
      users = this.userModel.createQueryBuilder('user');
      users = await users.getMany();
      return customResponseHandler(users, 'All users retrieved successfully');
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async findOne(id: string) {
    try {
      const users = await this.userModel.findOne({ where: { id } });
      return customResponseHandler(users, 'User retrieved successfully');
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userModel.findOne({ where: { id } });
      if (updateUserDto?.password) {
        updateUserDto.password = await hashPassword(updateUserDto.password);
      }
      user.firstName = updateUserDto.firstName || user.firstName;
      user.lastName = updateUserDto.lastName || user.lastName;
      user.password = updateUserDto.password || user.password;
      user.isActive = updateUserDto.isActive || user.isActive;
      await this.userModel.save(user);
      return customResponseHandler(user, 'User updated successfully');
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async remove(id: string) {
    try {
      const user = await this.userModel.findOne({ where: { id } });
      await this.userModel.remove(user);
      return customResponseHandler(user, 'User deleted successfully');
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async existingUserBy(key: string, value: string): Promise<User> {
    return await this.userModel.findOne({
      where: { [key]: value },
    });
  }
}
