import { UserEntity } from './../user/user.entity';
import { GuardianEntity } from './../guardian/guardian.entity';
import { SubjectEntity } from './../subject/subject.entity';
import { LevelEntity } from './../level/level.entity';
import { Entity, Column, ManyToOne, OneToMany, OneToOne } from 'typeorm';
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

  @ManyToOne(
    () => LevelEntity,
    level => level.student,
  )
  level: LevelEntity;

  @Column({ nullable: false })
  levelId: string;

  @Column({ type: 'varchar', nullable: true, length: '10' })
  term: string;

  @Column({ type: 'varchar', nullable: true })
  previous_school: string;

  @Column({ type: 'varchar', nullable: true })
  special_needs: string;

  @OneToMany(
    () => SubjectEntity,
    subject => subject.id,
  )
  subject: SubjectEntity[];

  @ManyToOne(
    () => GuardianEntity,
    guardian => guardian.id,
  )
  guardian: GuardianEntity;

  @Column({ nullable: false })
  guardianId: string;

  @OneToOne(
    () => UserEntity,
    user => user.id,
    { cascade: true },
  )
  user: UserEntity;
}
