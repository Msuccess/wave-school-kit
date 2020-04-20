import { SubjectEntity } from './../subject/subject.entity';
import { StudentEntity } from './../student/student.entity';
import {
  Entity,
  Column,
  OneToMany,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { EntityBase } from '../shared/entity-base';

@Entity({ name: 'LevelTable' })
export class LevelEntity extends EntityBase {
  @Column({ type: 'varchar', nullable: false, length: '50' })
  name: string;

  @Column({ type: 'varchar', nullable: true, length: '50' })
  teacher: string;

  @ManyToMany(
    () => SubjectEntity,
    subject => subject.levels,
    { cascade: true, eager: true },
  )
  @JoinTable({ name: 'LevelsSubjectsLink' })
  subjects: SubjectEntity[];

  @OneToMany(
    () => StudentEntity,
    student => student.id,
  )
  @JoinColumn()
  student: StudentEntity[];
}
