import { Body, Controller, HttpCode, Put, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { Request } from 'express';

@Controller('user')
@ApiTags('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Auth()
  @HttpCode(200)
  @ApiBearerAuth('tma')
  @Put()
  async updateProfile(@Req() request: Request, @Body() dto: UserDto) {
    const userId = request.user.id;
    return this.userService.update(userId, dto);
  }
}
