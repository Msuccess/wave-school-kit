import { StudentEntity } from './../student/student.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { UserBaseEntity } from '../shared/user-baseentity';

@Entity({ name: 'GuardianTable' })
export class GuardianEntity extends UserBaseEntity {
  @Column({ type: 'varchar', nullable: true, length: '50' })
  occuption: string;

  @Column({ type: 'varchar', nullable: true, length: '13' })
  telephone: string;

  @Column({ type: 'varchar', nullable: true })
  address: string;

  @Column({ type: 'varchar', nullable: true })
  relation: string;

  @OneToMany(
    () => StudentEntity,
    student => student.id,
  )
  student: StudentEntity[];
}
