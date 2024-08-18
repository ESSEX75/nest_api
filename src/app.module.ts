import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { APP_FILTER } from '@nestjs/core';
import { ReportModule } from './reports/reports.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, AuthModule, ReportModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    }
  ]
})
export class AppModule {}
