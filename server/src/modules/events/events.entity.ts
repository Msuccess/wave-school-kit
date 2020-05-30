import { EntityBase } from '../shared/entity-base';
import { Entity } from 'typeorm';

@Entity({ name: 'EventsTable' })
export class EventsEntity extends EntityBase {}
