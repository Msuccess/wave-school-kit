import { LevelEntity } from './../level/level.entity';
import { ResultEntity } from './../result/result.entity';
import { EntityBase } from '../shared/entity-base';
import { Entity, Column, OneToOne, ManyToMany, JoinTable } from 'typeorm';

@Entity({ name: 'SubjectTable' })
export class SubjectEntity extends EntityBase {
  @Column({ type: 'varchar', length: '50', nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  subjectCode: string;

  @ManyToMany(() => LevelEntity, { cascade: true, eager: true })
  @JoinTable({ name: 'SubjectsLevelsTable' })
  levels: LevelEntity[];

  @OneToOne(
    () => ResultEntity,
    result => result.id,
  )
  result: ResultEntity;
}
