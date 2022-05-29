/**
 * @param {String}      id            - unique id of the task
 * @param {String}      taskName      - name of the todo task
 * @param {Date}        createdAt     - date of the created task
 * @param {boolean}     deleted       - indicates soft delition of the task
 */
export interface Task {
  id?: string;
  taskName?: string;
  createdAt?: Date;
  deleted?: boolean;
}
