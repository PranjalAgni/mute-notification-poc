import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from "typeorm";

@Entity()
export class Status extends BaseEntity {
  @PrimaryGeneratedColumn()
  statusId: number;

  @Column()
  description: string;

  @Column()
  status: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @CreateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
