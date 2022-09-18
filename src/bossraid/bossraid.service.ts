import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { BossRaidHistory } from './bossraid.entity';

@Injectable()
export class BossraidService {
  constructor(
    @InjectRepository(BossRaidHistory)
    private readonly bossRaidHistoryRepository: Repository<BossRaidHistory>,

    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async getBossraidStatus() {
    const recent_history = await this.bossRaidHistoryRepository.find({
      relations: { userId: true },
      order: { enterTime: 'DESC' },
      take: 1,
    });

    console.log(recent_history);

    const canEnter = recent_history[0].endTime != null;
    let enteredUserId;

    if (canEnter) enteredUserId = null;
    else enteredUserId = recent_history[0].userId.userId;

    console.log(enteredUserId);

    return Object.assign({
      data: { canEnter: canEnter, enteredUserId: enteredUserId },
      statusCode: 200,
      message: '보스레이드 상태를 조회합니다.',
    });
  }
}
