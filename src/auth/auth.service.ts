import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { InitDataParsed, parse, validate } from '@tma.js/init-data-node';
// Переписать метода на такой



@Injectable()
export class AuthService {
  constructor( 
    private readonly usersService: UsersService,
  ) {}

  async login (user_id: number): Promise<any> {
    try {
      return await this.usersService.findOneByTelegramId(user_id);
    } catch (err) {
      throw new ForbiddenException('Ошибка при авторизации');
    }
  }

// Разберист кто и что возвращает
  async register(dto: CreateUserDto) {
    try {
      return await this.usersService.create(dto);
    } catch (err) {
      throw new ForbiddenException('Ошибка при регистрации');
    }
  }

  async validateUser(initData: string): Promise<any> {
    try {
      // Validate and parse initData from Telegram
      validate(initData, process.env.TELEGRAM_BOT_TOKEN, {
        expiresIn: 3600,
      });

      const parsedData: InitDataParsed = parse(initData);

      // Check if user exists in your database
      const user = await this.usersService.findOneByTelegramId(parsedData.user.id);

      if (!user) {
        // If user does not exist, you might want to register the user
        // or throw an exception
        throw new ForbiddenException('User not found');
      }

      return user;
    } catch (err) {
      throw new ForbiddenException('Invalid Telegram init data');
    }
  }


}
