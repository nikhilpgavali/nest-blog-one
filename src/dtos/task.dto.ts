import { IsNotEmpty } from 'class-validator';
/**
 * @property {string}       taskName      - name of the todo task
 * @property {Date}         createdAt     - created date of the task
 * @property {boolean}      deleted       - indicates the soft deletion of the task
 *
 * @author  nikhil.gavali
 */
export class TaskDto {
  @IsNotEmpty()
  taskName: string;

  @IsNotEmpty()
  createdAt: Date;

  @IsNotEmpty()
  deleted: boolean;
}
