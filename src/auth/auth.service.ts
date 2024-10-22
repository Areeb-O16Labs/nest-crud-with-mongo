import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { checkPassword, customResponseHandler } from 'src/config/helpers';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    try {
      const user = await this.usersService.existingUserBy('email', email);
      if (user) {
        const match = await checkPassword(password, user.password);
        if (match) {
          const payload = { userId: user.id };
          const token = await this.jwtService.signAsync(payload);
          return customResponseHandler(
            { user, token },
            'User logged in successfully',
          );
        }
        throw new InternalServerErrorException('Invalid Password!');
      }
      throw new InternalServerErrorException('Invalid Email!');
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async logout(userId: string) {
    try {
      return customResponseHandler({ userId }, 'User logged out successfully');
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
