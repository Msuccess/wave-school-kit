import { SubjectEntity } from './subject.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(SubjectEntity)
export class SubjectRepository extends Repository<SubjectEntity> {}
