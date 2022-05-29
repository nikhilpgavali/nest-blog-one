import { Task } from '../interfaces/task.interface';
import { mock } from '../../tests/mock';
import { EntityManager } from 'typeorm';
import { TodoRepository } from './todo.repository';
import { Todo } from '../entities/todo.entity';

describe('TodoRepository', () => {
  let entityManager;

  beforeEach(() => {
    entityManager = mock<EntityManager>({});
  });

  describe('addTask', () => {
    it('should run the query properly', async () => {
      let taskMock: Task = {
        taskName: 'writing',
        createdAt: new Date(),
      };

      entityManager = mock<EntityManager>({
        save: jest.fn().mockResolvedValue(
          new Todo({
            id: '1',
            taskName: 'writing',
            createdAt: expect.any(Date),
            deleted: false,
          }),
        ),
      });

      const todoRepository = new TodoRepository(entityManager);
      const result = await todoRepository.addTask(taskMock);
      expect(result).toEqual(
        new Todo({
          id: '1',
          taskName: 'writing',
          createdAt: expect.any(Date),
          deleted: false,
        }),
      );
      expect(entityManager.save).toHaveBeenCalledWith(taskMock);
    });
  });

  describe('findById', () => {
    it('should ru the query properly', async () => {
      let taskIdMock = '1';
      let expectedResult = new Todo({
        id: '1',
        taskName: 'reading',
        createdAt: expect.any(Date),
        deleted: false,
      });

      let queryBuilderMock = {
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(expectedResult),
      };

      entityManager = mock<EntityManager>({
        createQueryBuilder: jest
          .fn()
          .mockImplementation(() => queryBuilderMock),
      });

      const todoRepository = new TodoRepository(entityManager);
      const result = await todoRepository.findById(taskIdMock);
      expect(result).toEqual(expectedResult);
      expect(queryBuilderMock.select).toHaveBeenCalledWith('todo');
      expect(queryBuilderMock.where).toHaveBeenCalledWith(
        'todo.deleted = false',
      );
      expect(queryBuilderMock.andWhere).toHaveBeenCalledWith('todo.id = :id', {
        id: taskIdMock,
      });
      expect(queryBuilderMock.getOne).toHaveBeenCalledWith();
      expect(queryBuilderMock.getOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should run the query properly', async () => {
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
      let queryBuilderMock = {
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(tasksMock),
      };

      entityManager = mock<EntityManager>({
        createQueryBuilder: jest
          .fn()
          .mockImplementation(() => queryBuilderMock),
      });

      const todoRepository = new TodoRepository(entityManager);
      const result = await todoRepository.findAll();
      expect(result).toEqual(tasksMock);
    });
  });
});
