import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthorizationGuard extends AuthGuard('authorization') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
}
