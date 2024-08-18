import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-strategy';
import { AuthService } from '../auth.service';
import { Request } from 'express';

class CustomStrategy extends Strategy {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async authenticate(req: Request): Promise<void> {
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

      if (!parsedData) {
        return this.fail(new UnauthorizedException('Invalid init data'), 401);
      }

      // Поиск пользователя
      const user = await this.authService.login(parsedData.user.id);

      if (!user) {
        console.log(
          'UnauthorizedException',
          this.error(
            new UnauthorizedException('Invalid authorization header format')
          )
        );
        return this.error(
          new UnauthorizedException('Invalid authorization header format')
        );
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
