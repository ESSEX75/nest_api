import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ReportDto } from './dto/report.dto';

@Injectable()
export class ReportService {
  constructor(private repository: PrismaService) {}

  async getAll(userId: string) {
    return this.repository.report.findMany({
      where: {
        userId
      }
    });
  }

  async create(dto: ReportDto, userId: string) {
    return this.repository.report.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: userId
          }
        }
      }
    });
  }

  async update(dto: Partial<ReportDto>, taskId: string, userId: string) {
    return this.repository.report.update({
      where: {
        userId,
        id: taskId
      },
      data: dto
    });
  }

  async delete(taskId: string) {
    return this.repository.report.delete({
      where: {
        id: taskId
      }
    });
  }
}
