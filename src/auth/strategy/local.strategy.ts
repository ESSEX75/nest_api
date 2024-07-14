import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    console.log("!!!!!!!!!!!!")

    if (!authHeader) {
      throw new UnauthorizedException('Init data is missing');
    }

    const [authType, initData] = authHeader.split(' ');

    if (authType !== 'tma' || !initData) {
      throw new UnauthorizedException('Invalid authorization header format');
    }
    console.warn("authHeader!", authHeader)
    console.log("authHeader!", authHeader)

    const user = await this.authService.validateUser(initData);
    if (!user) {
      throw new UnauthorizedException('Invalid init data');
    }

    request.user = user;
    return true;
  }
}
