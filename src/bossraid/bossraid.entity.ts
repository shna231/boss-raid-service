import { Users } from 'src/users/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class BossRaidHistory {
  @PrimaryGeneratedColumn({ comment: '보스레이드 기록 아이디' })
  id!: number;

  @ManyToOne(() => Users, (user) => user.bossRaidHistory, { nullable: false })
  @JoinColumn({ name: 'user' })
  userId!: Users;

  @Column({ comment: '점수', nullable: true })
  score?: number;

  @Column({ comment: '입장 시간' })
  enterTime!: string;

  @Column({ comment: '종료 시간', nullable: true })
  endTime?: string;
}
