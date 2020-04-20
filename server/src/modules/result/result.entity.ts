import { SubjectEntity } from './../subject/subject.entity';
import { Entity, Column, OneToOne } from 'typeorm';
import { EntityBase } from '../shared/entity-base';

@Entity({ name: 'ResultTable' })
export class ResultEntity extends EntityBase {
  @OneToOne(
    () => SubjectEntity,
    subject => subject.result,
  )
  subject: SubjectEntity;

  @Column()
  subjectId: string;

  @Column({ type: 'varchar', nullable: false, length: '50' })
  student_year: string;

  @Column({ type: 'varchar', nullable: false })
  level: string;

  @Column({ type: 'int', nullable: false })
  term: number;

  @Column({ type: 'int', nullable: false })
  score: number;
}
