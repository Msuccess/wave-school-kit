import { PrimaryGeneratedColumn, Column, Generated, BaseEntity } from 'typeorm';

export class Base extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  public id: number;

  @Column()
  public username: string;

  @Column()
  public email: string;

  @Column()
  public phoneNumber: string;

  @Column()
  public password: string;

  @Column({ nullable: true })
  public dateCreated: Date;

  @Column({ nullable: true })
  public dateUpdated: Date;
}
