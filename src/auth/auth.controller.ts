import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UnauthorizedException
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Auth } from './decorators/auth.decorator';
import { initDataRow } from './dto/init-data.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Auth()
  @HttpCode(200)
  @ApiBearerAuth('tma')
  @Post('login')
  async login(@Req() request: Request) {
    const user = request.user;
    console.log(user);

    if (!user) {
      throw new UnauthorizedException('Authorization header is missing');
    }
    return user;
  }

  @HttpCode(200)
  @Post('register')
  async register(@Body() body: initDataRow) {
    const initData = body.initDataRow;

    if (!initData) {
      throw new UnauthorizedException('Authorization body is missing');
    }

    try {
      const parsedData = await this.authService.validateUser(initData);

      const dataUser = { telegramId: parsedData.user.id, yandexToken: '' };

      const newUser = await this.authService.register(dataUser);
      console.log('newUser: ', newUser);

      return newUser;
    } catch (error) {
      throw new UnauthorizedException('Invalid init data');
    }
  }
}
