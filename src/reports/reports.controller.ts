import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req
} from '@nestjs/common';
import { ReportService } from './reports.service';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ReportDto } from './dto/report.dto';

@ApiTags('report')
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Auth()
  @HttpCode(200)
  @ApiBearerAuth('tma')
  @Get()
  async getAll(@Req() request: Request) {
    const userId = request.user.id;
    return this.reportService.getAll(userId);
  }

  @Auth()
  @HttpCode(200)
  @ApiBearerAuth('tma')
  @Post()
  async create(@Body() dto: ReportDto, @Req() request: Request) {
    const userId = request.user.id;
    return this.reportService.create(dto, userId);
  }

  @Auth()
  @HttpCode(200)
  @Put(':id')
  @ApiBearerAuth('tma')
  async update(
    @Body() dto: ReportDto,
    @Req() request: Request,
    @Param('id') id: string
  ) {
    const userId = request.user.id;
    return this.reportService.update(dto, id, userId);
  }

  @Auth()
  @HttpCode(200)
  @Delete(':id')
  @ApiBearerAuth('tma')
  async delete(@Param('id') id: string) {
    return this.reportService.delete(id);
  }
}
