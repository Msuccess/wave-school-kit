import { Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'others',
}

export class UserBaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, length: '50' })
  firstname: string;

  @Column({ type: 'varchar', nullable: false, length: '50' })
  lastname: string;

  @Column({ type: 'varchar', default: new Date(Date.now()) })
  createdAt: string;

  @Column({ type: 'varchar', default: new Date(Date.now()) })
  updateDate: string;

  @Column({ type: 'varchar', nullable: true })
  avatar: string;

  @Column({ type: 'enum', nullable: true, enum: Gender })
  gender: string;

  @Column({ type: 'varchar', nullable: true, length: '50' })
  religion: string;
}
