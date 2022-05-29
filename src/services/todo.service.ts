import { Injectable } from '@nestjs/common';
import { Todo } from '../entities/todo.entity';
import { Task } from '../interfaces/task.interface';
import { TodoRepository } from '../repository/todo.repository';

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  /**
   * @param{Todo}    task       - Payload of the task
   * @returns {Promise<Todo>}  returns todo object
   */
  async addTask(task: Task): Promise<Todo> {
    return await this.todoRepository.addTask(task);
  }
}
