import { Injectable } from '@nestjs/common';
import { Todo } from '../entities/todo.entity';
import { Task } from '../interfaces/task.interface';
import { TodoRepository } from '../repository/todo.repository';

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  /** create task
   * @property {Todo}    task       - Payload of the task
   * @returns {Promise<Todo>}  returns todo object
   */
  async addTask(task: Task): Promise<Todo> {
    return await this.todoRepository.addTask(task);
  }

  /**
   * find by task id
   * @property {string}   id    - unique identifier of the task
   * @returns {Promise<Todo>}   - returns task
   */
  async findById(id: string): Promise<Todo> {
    return await this.todoRepository.findById(id);
  }

  /**
   * find all tasks
   * @returns {Promise<Todo[]>}  - retuns all tasks
   */
  async findAll(): Promise<Todo[]> {
    return await this.todoRepository.findAll();
  }
}
