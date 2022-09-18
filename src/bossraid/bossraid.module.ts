import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { BossraidController } from './bossraid.controller';
import { BossRaidHistory } from './bossraid.entity';
import { BossraidService } from './bossraid.service';

@Module({
  imports: [TypeOrmModule.forFeature([BossRaidHistory, Users])],
  controllers: [BossraidController],
  providers: [BossraidService],
})
export class BossraidModule {}
