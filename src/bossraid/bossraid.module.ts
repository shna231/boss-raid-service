import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BossRaidHistory } from './bossraid.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BossRaidHistory])],
  controllers: [],
  providers: [],
})
export class BossraidModule {}
