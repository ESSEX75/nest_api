import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/user')
  //@UseGuards(JwtAuthGuard)
  getMe(id: number) {
    return this.usersService.findById(id);
  }

}
