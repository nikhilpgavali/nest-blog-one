import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('todo')
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('text', { name: 'task_name' })
  taskName: string;

  @Column('date', { name: 'created_at' })
  createdAt: Date;

  @Column('boolean')
  deleted?: boolean;

  constructor(todo: Partial<Todo> = {}) {
    Object.assign(this, todo);
  }
}
