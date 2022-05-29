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
});
