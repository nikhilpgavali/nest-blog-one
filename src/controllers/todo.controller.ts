import { Body, Controller, Get, Post } from '@nestjs/common';
import { TaskDto } from '../dtos/task.dto';
import { Todo } from '../entities/todo.entity';
import { TodoService } from '../services/todo.service';

@Controller()
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  /**
   * Create the todo task
   * @param{Task}    task    - Payload of the task
   * @returns {Promise<Todo>}  - object of the task
   */
  @Post('todo.addTask')
  async addTask(@Body() taskPayload: TaskDto): Promise<Todo> {
    return await this.todoService.addTask(taskPayload);
  }
}
