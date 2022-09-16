import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@Controller('api/v1/user')
@ApiTags('유저')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: '유저 생성 API',
    description: '새로운 유저를 생성하고, 아이디를 반환합니다.',
  })
  async createUser() {
    return await this.usersService.createUser();
  }
}
