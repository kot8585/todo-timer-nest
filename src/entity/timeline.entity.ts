import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Todo } from './todo.entity';

@Entity()
export class Timeline {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column()
  userUid: string;

  @Column()
  todoIdx: number;

  @Column('datetime')
  startDateTime: Date;

  @Column()
  executionTime: number;

  @Column('datetime')
  endDateTime: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date | null;

  @ManyToOne(() => Todo, (todo) => todo.timelines, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'todoIdx', referencedColumnName: 'idx' })
  todo: Relation<Todo>;
}
