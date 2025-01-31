import { Module } from '@nestjs/common';
import { ReportService } from './reports.service';
import { ReportController } from './reports.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ReportController],
  providers: [ReportService, PrismaService]
})
export class ReportModule {}
