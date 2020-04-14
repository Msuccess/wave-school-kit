import { PrimaryGeneratedColumn, BaseEntity, Column } from 'typeorm';

export class EntityBase extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', default: new Date(Date.now()) })
  createdAt: string;

  @Column({ type: 'varchar', default: new Date(Date.now()) })
  updateDate: string;
}
