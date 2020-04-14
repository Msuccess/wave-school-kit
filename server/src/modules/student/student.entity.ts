import { UserEntity } from './../user/user.entity';
import { GuardianEntity } from './../guardian/guardian.entity';
import { SubjectEntity } from './../subject/subject.entity';
import { LevelEntity } from './../level/level.entity';
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserBaseEntity } from '../shared/user-baseentity';

@Entity({ name: 'StudentTable' })
export class StudentEntity extends UserBaseEntity {
  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  studentId: string;

  @Column({ type: 'date', nullable: true })
  birthdate: Date;

  @Column({ type: 'varchar', nullable: true, length: '10' })
  term: string;

  @Column({ type: 'varchar', nullable: true })
  previous_school: string;

  @Column({ type: 'varchar', nullable: true })
  special_needs: string;

  @OneToOne(
    () => UserEntity,
    user => user.student,
    { cascade: true },
  )
  user: UserEntity;

  @ManyToOne(
    () => GuardianEntity,
    guardian => guardian.student,
  )
  @JoinColumn()
  guardian: GuardianEntity;

  @OneToMany(
    () => SubjectEntity,
    subject => subject.student,
  )
  subject: SubjectEntity[];

  @ManyToOne(
    () => LevelEntity,
    level => level.student,
  )
  level: LevelEntity;
}
