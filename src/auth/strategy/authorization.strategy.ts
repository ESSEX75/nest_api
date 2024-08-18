import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-strategy';
import { AuthService } from '../auth.service';
import { Request } from 'express';
import { UsersService } from '../../users/users.service';

class CustomStrategy extends Strategy {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) {
    super();
  }

  async authenticate(req: Request): Promise<void> {
    console.log('UsersService', this.userService.findOneByTelegramId);
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return this.fail(new UnauthorizedException('Init data is missing'), 401);
    }

    const [authType, initData] = authHeader.split(' ');

    if (authType !== 'tma' || !initData) {
      return this.fail(
        new UnauthorizedException('Invalid authorization header format'),
        401
      );
    }

    try {
      // Валидация пользователя
      const parsedData = await this.authService.validateUser(initData);

      // Поиск пользователя
      const user = await this.userService.findOneByTelegramId(
        parsedData.user.id
      );

      if (!user) {
        return this.fail(new UnauthorizedException('Invalid init data'), 401);
      }

      return this.success(user);
    } catch (err) {
      return this.error(err);
    }
  }
}

@Injectable()
export class AuthorizationStrategy extends PassportStrategy(
  CustomStrategy,
  'authorization'
) {
  constructor(authService: AuthService) {
    super(authService);
  }
}
