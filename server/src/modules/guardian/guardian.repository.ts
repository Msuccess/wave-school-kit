import { GuardianEntity } from './guardian.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(GuardianEntity)
export class GuardianRepository extends Repository<GuardianEntity> {}
