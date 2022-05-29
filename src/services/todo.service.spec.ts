import { TodoRepository } from '../repository/todo.repository';
import { mock } from '../../tests/mock';
import { TodoService } from './todo.service';
import { Todo } from '../entities/todo.entity';

describe('TodoService', () => {
  let todoRepositoryMock;
  let taskMock;
  beforeEach(() => {
    todoRepositoryMock = mock<TodoRepository>({
      addTask: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
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

  describe('findById', () => {
    it('call repository method correctly', async () => {
      let expectedResult = new Todo({
        id: '1',
        taskName: 'reading',
        createdAt: expect.any(Date),
        deleted: false,
      });
      const taskIdMock = '1';
      todoRepositoryMock = mock<TodoRepository>({
        findById: jest.fn().mockResolvedValue(expectedResult),
      });
      const todoService = new TodoService(todoRepositoryMock);
      const result = await todoService.findById(taskIdMock);
      expect(result).toEqual(expectedResult);
      expect(todoRepositoryMock.findById).toHaveBeenCalledWith(taskIdMock);
      expect(todoRepositoryMock.findById).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should call the repository method correctly', async () => {
      let tasksMock = [
        new Todo({
          id: '1',
          taskName: 'reading',
          createdAt: new Date(),
          deleted: false,
        }),
        new Todo({
          id: '2',
          taskName: 'writing',
          createdAt: new Date(),
          deleted: false,
        }),
      ];

      todoRepositoryMock = mock<TodoRepository>({
        findAll: jest.fn().mockResolvedValue(tasksMock),
      });

      let todoService = new TodoService(todoRepositoryMock);
      let result = await todoService.findAll();
      expect(result).toEqual(tasksMock);
      expect(todoRepositoryMock.findAll).toHaveBeenCalled();
      expect(todoRepositoryMock.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
