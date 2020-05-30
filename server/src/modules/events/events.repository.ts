import { Repository, EntityRepository } from 'typeorm';
import { EventsEntity } from './events.entity';

@EntityRepository(EventsEntity)
export class EventsRepository extends Repository<EventsEntity> {}
