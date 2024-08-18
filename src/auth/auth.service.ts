import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { parse, validate } from '@tma.js/init-data-node';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async login(user_id: number) {
    try {
      return await this.usersService.findOneByTelegramId(user_id);
    } catch (err) {
      throw new ForbiddenException('Ошибка при авторизации');
    }
  }

  async register(dto: UserDto) {
    try {
      return await this.usersService.create(dto);
    } catch (err) {
      throw new ForbiddenException('Ошибка при регистрации');
    }
  }

  async validateUser(initData: string) {
    try {
      validate(initData, process.env.TELEGRAM_BOT_TOKEN, {
        expiresIn: 0
      });
      return parse(initData);
    } catch (err) {
      throw new ForbiddenException('Invalid Telegram init data');
    }
  }
}
