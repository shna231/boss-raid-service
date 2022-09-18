import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EnterBossraidRequest } from './bossraid.dto';
import { BossraidService } from './bossraid.service';

@Controller('api/v1/bossRaid')
@ApiTags('보스레이드')
export class BossraidController {
  constructor(private readonly bossraidService: BossraidService) {}

  @Get()
  @ApiOperation({
    summary: '보스레이드 상태 조회 API',
    description: '보스레이드 입장 가능 여부를 조회합니다.',
  })
  async getBossraidStatus() {
    return await this.bossraidService.getBossraidStatus();
  }

  @Post('enter')
  @ApiOperation({
    summary: '보스레이드 입장 API',
    description:
      '보스레이드에 입장합니다. 유저 아이디와 입장할 레이드 레벨 정보가 필요합니다.',
  })
  async enterBossraid(@Body() req: EnterBossraidRequest) {
    return await this.bossraidService.createBossraidHistory(req);
  }
}
