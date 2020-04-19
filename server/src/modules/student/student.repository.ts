import { StudentEntity } from './student.entity';
import { Repository, EntityRepository, getRepository } from 'typeorm';

@EntityRepository(StudentEntity)
export class StudentRepository extends Repository<StudentEntity> {
  public async getStudentsByLevel(level: string) {
    return await getRepository(StudentEntity)
      .createQueryBuilder('Student')
      .where('Student.level = :level', { level: level })
      .getMany();
  }

  public async saveStudentEntity(student: any) {
    return await StudentEntity.save(student);
  }
}
