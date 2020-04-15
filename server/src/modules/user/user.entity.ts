import { StudentEntity } from './../student/student.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  TEACHER = 'teacher',
  STUDENT = 'student',
  USER = 'user',
}

@Entity({ name: 'UserTable' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  username: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STUDENT,
  })
  role: UserRole;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @OneToOne(
    () => StudentEntity,
    student => student.user,
    { eager: false },
  )
  student: StudentEntity;
}
