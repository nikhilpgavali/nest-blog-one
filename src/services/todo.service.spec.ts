import { TodoRepository } from '../repository/todo.repository';
import { mock } from '../../tests/mock';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let todoRepositoryMock;
  let taskMock;
  beforeEach(() => {
    todoRepositoryMock = mock<TodoRepository>({
      addTask: jest.fn(),
    });
  });

  describe('addTask', () => {
    beforeEach(() => {
      taskMock = {
        id: '1',
        taskName: 'writting',
        createdAt: new Date('10/01/2022'),
        deleted: false,
      };
      todoRepositoryMock = mock<TodoRepository>({
        addTask: jest.fn().mockResolvedValue(taskMock),
      });
    });
    it('call respository method correcttly', async () => {
      const todoService = new TodoService(todoRepositoryMock);
      const result = await todoService.addTask(taskMock);
      expect(result).toEqual(taskMock);
      expect(todoRepositoryMock.addTask).toHaveBeenCalledWith(taskMock);
      expect(todoRepositoryMock.addTask).toHaveBeenCalledTimes(1);
    });
  });
});
