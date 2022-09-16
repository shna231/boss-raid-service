import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryColumn({ type: 'varchar', length: '20' })
  id: string;

  @Column({ comment: '보스 레이드 기록' })
  raid_record_id: number;
}
