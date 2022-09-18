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
   * @returns userId : number (자동 생성된 유저 아이디)
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

  /**  유저 보스레이드 기록 조회
   *
   * @param userId 유저 아이디
   *
   * @returns totalScore : number (점수 총합)
   * @retunrs bossRaidHistory : bossRaidHistory[] (보스레이드 모든 기록)
   * */
  async getUserHistory(userId: number) {
    try {
      const history = await this.usersRepository.findOneOrFail({
        relations: ['bossRaidHistory'],
        where: { userId: userId },
      });

      let score = 0;

      for (let i = 0; i < history.bossRaidHistory.length; i++) {
        score += history.bossRaidHistory.at(i).score;
      }

      return Object.assign({
        data: {
          totalScpre: score,
          bossRaidHistory: history.bossRaidHistory,
        },
        statusCode: 200,
        message: '유저의 보스레이드 기록을 조회합니다.',
      });
    } catch (NotFoundException) {
      return Object.assign({
        statusCode: 404,
        message: '해당 아이디의 유저가 존재하지 않습니다.',
      });
    }
  }
}
