import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Status } from "./Status";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @ManyToOne(() => Status, { nullable: true, cascade: true })
  @JoinColumn({ name: "status" })
  @Column({ nullable: true })
  status: Status;

  @Column("timestamp", {
    name: "expiry_time",
    default: () => "CURRENT_TIMESTAMP",
    nullable: true
  })
  expiryTime: Date;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @CreateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
