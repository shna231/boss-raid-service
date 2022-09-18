import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EnterBossraidRequest, ShutdownBossraidRequest } from './bossraid.dto';
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

  @Patch('end')
  @ApiOperation({
    summary: '보스레이드 종료 API',
    description:
      '보스레이드를 종료합니다. 현 버전에서는 score가 없데이트되지 않습니다.',
  })
  async shutdownBossraid(@Body() req: ShutdownBossraidRequest) {
    return await this.bossraidService.shutdownBossraidHistory(req);
  }
}
