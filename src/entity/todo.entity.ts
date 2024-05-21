import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Timeline } from './timeline.entity';

@Entity()
@Index('idx_todo_1', ['category'])
export class Todo {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column()
  userUid: string;

  @Column()
  categoryIdx: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ nullable: true })
  color: string;

  @Column()
  startDate: Date;

  @Column({ type: 'boolean', default: false })
  isCompleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date | null;

  @ManyToOne(() => Category, (category) => category.todos, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'categoryIdx', referencedColumnName: 'idx' })
  category: Relation<Category>;

  @OneToMany(() => Timeline, (timeline) => timeline.todo)
  timelines: Relation<Timeline[]>;
}
