import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
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
  async getUserHistory() {
    return await this.bossraidService.getBossraidStatus();
  }
}
