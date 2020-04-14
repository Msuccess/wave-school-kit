import { LevelEntity } from './level.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(LevelEntity)
export class LevelRepository extends Repository<LevelEntity> {}
