import { ApiProperty } from '@nestjs/swagger';

export class EnterBossraidRequest {
  @ApiProperty({
    description: '유저 아이디',
    required: true,
  })
  readonly userId: number;

  @ApiProperty({
    description: '보스레이드 레벨',
    required: true,
    default: 1,
  })
  readonly level: number;
}

export class ShutdownBossraidRequest {
  @ApiProperty({
    description: '유저 아이디',
    required: true,
  })
  readonly userId: number;

  @ApiProperty({
    description: '보스레이드 기록 아이디',
    required: true,
  })
  readonly raidRecordId: number;
}
