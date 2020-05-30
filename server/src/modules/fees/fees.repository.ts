import { EntityRepository, Repository } from 'typeorm';
import { FeesEntity } from './fees.entity';

@EntityRepository(FeesEntity)
export class FeesRepository extends Repository<FeesEntity> {}
