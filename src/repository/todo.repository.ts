import { Injectable } from '@nestjs/common';
import { Todo } from '../entities/todo.entity';
import { Task } from '../interfaces/task.interface';
import { EntityManager } from 'typeorm';

@Injectable()
export class TodoRepository {
  constructor(private readonly entityManager: EntityManager) {}

  /**
   * @param {Task}   task    - payload of the task
   * @returns {Todo}   - returns todo object
   */
  async addTask(task: Task): Promise<Todo> {
    let data = new Todo({
      taskName: task.taskName,
      createdAt: task.createdAt,
    });
    return await this.entityManager.save(data);
  }
}
