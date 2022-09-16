import { Controller, Get, Post, Query } from '@nestjs/common';
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

  @Get(':userId')
  @ApiOperation({
    summary: '유저 조회 API',
    description: '해당 유저의 보스레이드 기록을 조회합니다.',
  })
  async getUserHistory(@Query('userId') userId: number) {
    return await this.usersService.getUserHistory(userId);
  }
}
