import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BossRaidHistory } from 'src/bossraid/bossraid.entity';
import { Repository } from 'typeorm';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  /**  새로운 유저 생성
   *
   * parameter : X
   * return :userId(자동 생성))
   * */
  async createUser() {
    const empty_history: BossRaidHistory[] = [];
    const user: Users = await this.usersRepository.save({
      bossRaidHistory: empty_history,
    });

    return Object.assign({
      data: { userId: user.userId },
      statusCode: 201,
      message: '새로운 유저를 생성하였습니다.',
    });
  }
}
