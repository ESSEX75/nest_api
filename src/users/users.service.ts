import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private repository: Repository<UserEntity>,
  ) {}

  async findById(id: number): Promise<UserEntity | undefined> {
    return this.repository.findOneBy({ id });
  }

  async findOneByTelegramId(user_id: number): Promise<UserEntity | undefined> {
    return this.repository.findOneBy({ user_id });
  }

  async create(dto: CreateUserDto): Promise<CreateUserDto> {
    const user = this.repository.create(dto);
    return this.repository.save(user);
  }
}
