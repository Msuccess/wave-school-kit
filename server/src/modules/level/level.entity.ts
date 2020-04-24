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

  @ManyToMany(() => SubjectEntity, {
    cascade: ['insert', 'update', 'remove'],
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'LevelsSubjectsLink',
    joinColumn: { referencedColumnName: 'id', name: 'levelId' },
    inverseJoinColumn: { referencedColumnName: 'id', name: 'subjectId' },
  })
  subjects: SubjectEntity[];

  @OneToMany(
    () => StudentEntity,
    student => student.id,
  )
  @JoinColumn()
  student: StudentEntity[];
}
