import {
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'enum', nullable: true, enum: Gender })
  gender: string;

  @Column({ type: 'varchar', nullable: true, length: '50' })
  religion: string;
}
