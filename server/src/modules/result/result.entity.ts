import { SubjectEntity } from './../subject/subject.entity';
import { Entity, Column, OneToOne, ManyToOne } from 'typeorm';
import { EntityBase } from '../shared/entity-base';
import { StudentEntity } from './../student/student.entity';

@Entity({ name: 'ResultTable' })
export class ResultEntity extends EntityBase {
  @OneToOne(
    () => SubjectEntity,
    subject => subject.result,
    { cascade: true, eager: true },
  )
  subject: SubjectEntity;

  studentId: string;

  @ManyToOne(
    () => StudentEntity,
    student => student.result,
  )
  student: StudentEntity;

  @Column({ type: 'varchar', nullable: false, length: '50' })
  acadamic_year: string;

  @Column({ type: 'varchar', nullable: false })
  level: string;

  @Column({ type: 'varchar', nullable: true })
  term: string;

  @Column({ type: 'int', nullable: false })
  score: number;
}
