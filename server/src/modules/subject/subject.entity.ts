import { LevelEntity } from './../level/level.entity';
import { ResultEntity } from './../result/result.entity';
import { StudentEntity } from './../student/student.entity';
import { EntityBase } from '../shared/entity-base';
import { Entity, Column, ManyToOne, OneToOne, OneToMany } from 'typeorm';

@Entity({ name: 'SubjectTable' })
export class SubjectEntity extends EntityBase {
  @Column({ type: 'varchar', length: '50', nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  subjectCode: string;

  @OneToMany(
    () => LevelEntity,
    level => level.id,
  )
  level: string;

  @ManyToOne(
    () => StudentEntity,
    student => student.subject,
  )
  student: StudentEntity;

  @OneToOne(
    () => ResultEntity,
    result => result.id,
  )
  result: ResultEntity;

  @Column({ nullable: true })
  studentId: string;
}
