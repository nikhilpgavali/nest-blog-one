import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TaskDto } from '../dtos/task.dto';
import { Todo } from '../entities/todo.entity';
import { TodoService } from '../services/todo.service';

@Controller()
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  /**
   * Create the todo task
   * @Body{Task}    task    - Payload of the task
   * @returns {Promise<Todo>}  - object of the task
   */
  @Post('todo.addTask')
  async addTask(@Body() taskPayload: TaskDto): Promise<Todo> {
    return await this.todoService.addTask(taskPayload);
  }

  /**
   * @param {string}     id     - unique identifier of the task
   * @returns {Promise<Todo>}   - object of the task
   */
  @Get('todo.findById/:id')
  async findById(@Param('id') id: string): Promise<Todo> {
    return await this.todoService.findById(id);
  }

  /**
   * @retuns {Promise<Todo>}    - retuns all the tasks
   */
  @Get('todo.findAll')
  async findAll(): Promise<Todo[]> {
    return await this.todoService.findAll();
  }
}
