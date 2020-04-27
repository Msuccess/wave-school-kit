import { Repository, EntityRepository } from 'typeorm';
import { TeacherEntity } from './teacher.entity';

@EntityRepository(TeacherEntity)
export class TeacherRepository extends Repository<TeacherEntity> {
  public async saveTeacherEntity(teacher: any) {
    return await TeacherEntity.save(teacher);
  }
}
