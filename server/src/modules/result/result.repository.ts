import { ResultEntity } from './result.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(ResultEntity)
export class ResultRepository extends Repository<ResultEntity> {}
