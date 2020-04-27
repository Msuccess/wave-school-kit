import { UserBaseEntity } from './../shared/user-baseentity';
import { UserEntity } from '../user/user.entity';
import { JoinColumn, OneToOne, Entity } from 'typeorm';

@Entity({ name: 'TeacherTable' })
export class TeacherEntity extends UserBaseEntity {
  @OneToOne(
    () => UserEntity,
    user => user.teacher,
    { cascade: true, eager: true },
  )
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
