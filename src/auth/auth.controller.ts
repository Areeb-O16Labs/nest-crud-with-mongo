import { Body, Controller, Delete, Post, Request, UseGuards } from '@nestjs/common';
import { loginDto } from './dto/login.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';


@Controller('auth')
@ApiTags('auth')

export class AuthController {
    constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() createUserDto: loginDto) {
    return this.authService.login(createUserDto.email, createUserDto.password);
  }

  @Delete('logout')
  @UseGuards(AuthGuard)
  @ApiSecurity('access-token')
  logout(@Request() req) {    
    return this.authService.logout(req.user.userId);
  }
}
