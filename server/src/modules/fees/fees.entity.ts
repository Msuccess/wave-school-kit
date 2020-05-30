import { EntityBase } from '../shared/entity-base';
import { Entity } from 'typeorm';

@Entity({ name: 'FeesTable' })
export class FeesEntity extends EntityBase {}
