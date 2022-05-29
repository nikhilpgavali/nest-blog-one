import { Get, Injectable } from '@nestjs/common';
import { Todo } from '../entities/todo.entity';
import { Task } from '../interfaces/task.interface';
import { EntityManager } from 'typeorm';

@Injectable()
export class TodoRepository {
  constructor(private readonly entityManager: EntityManager) {}

  /** Create task
   * @property {Task}   task    - payload of the task
   * @returns {Todo}   - returns todo object
   */
  async addTask(task: Task): Promise<Todo> {
    let data = new Todo({
      taskName: task.taskName,
      createdAt: task.createdAt,
    });
    return await this.entityManager.save(data);
  }

  /**
   * Get task by id
   * @property {string}     id      - unique identifier of the task
   * @returns {Promise<Todo>} returns task
   */
  async findById(id: string): Promise<Todo> {
    return await this.entityManager
      .createQueryBuilder(Todo, 'todo')
      .select('todo')
      .where('todo.deleted = false')
      .andWhere('todo.id = :id', { id: id })
      .getOne();
  }

  /**
   * Get All Tasks
   * @returns {Promise<Todo>}   return all tasks
   */
  async findAll(): Promise<Todo[]> {
    return await this.entityManager
      .createQueryBuilder(Todo, 'todo')
      .select('todo')
      .where('todo.deleted = false')
      .getMany();
  }
}
