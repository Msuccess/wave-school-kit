import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Payer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, length: '50' })
  full_name: string;

  @Column({ type: 'varchar', nullable: false, length: '50' })
  email: string;

  @Column({ type: 'varchar', nullable: false, length: '50' })
  amount: string;

  @Column({ type: 'varchar', nullable: false, length: '50' })
  reference: string;
}
