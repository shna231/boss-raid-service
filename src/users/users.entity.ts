import { BossRaidHistory } from 'src/bossraid/bossraid.entity';
import {
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn({ comment: '유저 아이디' })
  userId!: number;

  @OneToMany(() => BossRaidHistory, (bossRaidHistory) => bossRaidHistory.userId)
  bossRaidHistory?: BossRaidHistory[];

  @CreateDateColumn()
  createdAt;
}
