import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthorizationGuard } from './guards/authorization.guard';
import { AuthorizationStrategy } from './strategy/authorization.strategy';

@Module({
  imports: [UsersModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, AuthorizationGuard, AuthorizationStrategy]
})
export class AuthModule {}
