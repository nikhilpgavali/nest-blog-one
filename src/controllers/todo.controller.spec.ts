import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { mock } from '../../tests/mock';
import { TodoService } from '../services/todo.service';
import { setupApplication } from '../app-util';
import { TodoController } from './todo.controller';

describe('TodoController (Integration)', () => {
  let app: INestApplication;
  const todoServiceMock = mock<TodoService>({
    addTask: jest.fn(),
  });

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      providers: [
        {
          provide: TodoService,
          useValue: todoServiceMock,
        },
      ],
      controllers: [TodoController],
    }).compile();
    app = moduleFixture.createNestApplication();
    setupApplication(app);
    await app.init();
  });

  beforeEach(() => {
    jest.resetAllMocks();
    todoServiceMock.addTask = jest.fn();
  });

  describe('todo.addTask', () => {
    let taskMock = { taskName: 'shopping' };
    it('returns 201 when task is created', () => {
      return request(app.getHttpServer())
        .post(`/todo.addTask`)
        .send(taskMock)
        .expect(201)
        .then(() => {
          expect(todoServiceMock.addTask).toHaveBeenCalledWith(taskMock);
        });
    });
  });
});
