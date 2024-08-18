import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private repository: PrismaService) {}

  async findById(id: string) {
    return this.repository.user.findUnique({
      where: {
        id
      }
    });
  }

  async findOneByTelegramId(telegramId: number) {
    return this.repository.user.findUnique({
      where: {
        telegramId
      }
    });
  }

  async create(user: UserDto) {
    return this.repository.user.create({
      data: user
    });
  }

  async update(id: string, dto: UserDto) {
    return this.repository.user.update({
      where: {
        id
      },
      data: dto,
      select: {
        yandexToken: true
      }
    });
  }
}
