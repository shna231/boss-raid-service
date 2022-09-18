import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import TimeUtils from 'src/utils/utils.time';
import { Repository } from 'typeorm';
import { EnterBossraidRequest, ShutdownBossraidRequest } from './bossraid.dto';
import { BossRaidHistory } from './bossraid.entity';

@Injectable()
export class BossraidService {
  constructor(
    @InjectRepository(BossRaidHistory)
    private readonly bossRaidHistoryRepository: Repository<BossRaidHistory>,

    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  /** 보스레이드 상태 조회
   *
   * @returns canEnter : boolean (레이드 입장 가능 여부)
   * @returns enterdUserId : number (현제 레이드를 진행중인 유저의 아이디)
   */
  async getBossraidStatus() {
    const recent_history = await this.bossRaidHistoryRepository.find({
      relations: { userId: true },
      order: { enterTime: 'DESC' },
      take: 1,
    });

    const canEnter = recent_history[0].endTime != null;
    let enteredUserId;

    if (canEnter) enteredUserId = null;
    else enteredUserId = recent_history[0].userId.userId;

    return Object.assign({
      data: { canEnter: canEnter, enteredUserId: enteredUserId },
      statusCode: 200,
      message: '보스레이드 상태를 조회합니다.',
    });
  }

  /** 보스레이드 입장
   *
   * @param req userId(입장할 유저 아이디), level(보스레이드 레벨)
   *
   * @returns isEntered : boolean (입장 여부)
   * @returns raidRecordId : number (보스레이드 기록 아이디)
   */
  async createBossraidHistory(req: EnterBossraidRequest) {
    try {
      // process 0. 보스레이드 입장 가능 여부 : 403 Forbidden
      const recent_history = await this.bossRaidHistoryRepository.find({
        order: { enterTime: 'DESC' },
        take: 1,
      });

      const isSomeonEntered = recent_history[0].endTime == null;
      if (isSomeonEntered) {
        throw new ForbiddenException({
          status: HttpStatus.FORBIDDEN,
          message: '이미 레이드를 진행중인 유저가 있습니다.',
        });
      }

      // process 1. 해당 아이디의 유저 entity 존재 여부 : 404 Not Found
      const user = await this.usersRepository.findOneBy({
        userId: req.userId,
      });

      if (!user) {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: '해당 아이디의 유저가 존재하지 않습니다.',
        });
      }

      // process 2. 보스레이드 기록 entity 생성 : 입장시간, 유저 아이디 존재
      const new_history = this.bossRaidHistoryRepository.create({
        enterTime: TimeUtils.getCurrentDatetimeString(),
        userId: user,
      });

      // process 3. 생성한 보스레이드 기록 entity를 DB에 추가
      const result = await this.bossRaidHistoryRepository.save(new_history);

      // WARNING! 단순히 result의 null 여부로 isEntered 값을 결정지어도 되는가? 분석 후 추후 수정
      // process 4. 입장 여부 확인
      const isEntered = result != null;

      // process 5. 보스레이드 입장 정보 반환 후 종료
      return Object.assign({
        data: { isEntered: isEntered, raidRecordId: result.raidRecordId },
        statusCode: 200,
        message: '보스레이드에 입장하였습니다.',
      });
    } catch (Exception) {
      return Exception.response;
    }
  }

  /** 보스레이드 종료
   *
   * @param req userId(종료할 유저 아이디), raidRecordId(보스레이드 기록)
   */
  async shutdownBossraidHistory(req: ShutdownBossraidRequest) {
    try {
      // process 1. 현재 레이드 진행 확인 및 기록 아이디 비교 : 404 Not Found
      const recent_history = await this.bossRaidHistoryRepository.find({
        relations: { userId: true },
        order: { enterTime: 'DESC' },
        take: 1,
      });

      const isDiffBossraid = recent_history[0].raidRecordId != req.raidRecordId;

      if (isDiffBossraid) {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message:
            '요청한 보스레이드 기록 아이디는 현재 진행중인 보스레이드와 일치하지 않습니다.',
        });
      }

      // process 2. 해당 아이디의 유저의 레이드 진행 여부 : 404 Not Found
      const isSameUser = recent_history[0].userId.userId == req.userId;

      // process 3. 종료시간과 함께 종료 처리
      // WARNING! score도 종료 시 업데이트되어야 하나, 이번 과제 범위를 벗어나는 것으로 추정됨.
      if (isSameUser) {
        await this.bossRaidHistoryRepository.update(
          recent_history[0].raidRecordId,
          {
            endTime: TimeUtils.getCurrentDatetimeString(),
          },
        );

        return Object.assign({
          statusCode: 200,
          message: '보스레이드를 종료하였습니다.',
        });
      } else {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: '요청한 아이디의 유저는 현재 레이드 진행 상태가 아닙니다.',
        });
      }
    } catch (Exception) {
      return Exception.response;
    }
  }
}
