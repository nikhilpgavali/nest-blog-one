import { Todo } from './todo.entity';

describe('Todo', () => {
  describe('Entity', () => {
    it('should populate partial data', () => {
      const result = new Todo({
        id: 'task-id-1',
        taskName: 'writing',
        createdAt: new Date(),
        deleted: false,
      });
      expect(result.id).toBe('task-id-1');
      expect(result.taskName).toBe('writing');
      expect(result.createdAt).toEqual(expect.any(Date));
      expect(result.deleted).toBeFalsy();
    });
  });
});
