import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
 // замочик такой справа от контроллера 
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiBearerAuth('tma')
  @Post('login')
  async login(@Body('user_id') user_id: number) {

    const user = await this.authService.login(user_id);
    if (!user) {
      const newUser = await this.authService.register({ user_id });
      return newUser;
    }
    return user;
  }

  
}

