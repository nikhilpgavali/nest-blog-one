import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { mock } from '../../tests/mock';
import { TodoService } from '../services/todo.service';
import { setupApplication } from '../app-util';
import { TodoController } from './todo.controller';
import { Todo } from '../entities/todo.entity';

describe('TodoController (Integration)', () => {
  let app: INestApplication;
  let taskMock;
  let tasksMock;
  const todoServiceMock = mock<TodoService>({
    addTask: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn(),
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
    taskMock = {
      id: '1',
      taskName: 'reading',
      createdAt: new Date('10/02/2022'),
      deleted: false,
    };
    tasksMock = [
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
    todoServiceMock.addTask = jest.fn();
    todoServiceMock.findById = jest.fn().mockResolvedValue(taskMock);
    todoServiceMock.findAll = jest.fn().mockResolvedValue(tasksMock);
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

  describe('todo.findById/id', () => {
    let taskMockId: string = '1';
    it('returns 200 when task is returned', () => {
      return request(app.getHttpServer())
        .get(`/todo.findById/${taskMockId}`)
        .expect(200)
        .then(() => {
          expect(todoServiceMock.findById).toHaveBeenCalledWith(taskMockId);
          expect(todoServiceMock.findById).toHaveBeenCalledTimes(1);
          expect(todoServiceMock.findById).toBeCalled();
        });
    });
  });

  describe('todo.findAll', () => {
    it('return 200 when all the tasks returned', () => {
      return request(app.getHttpServer())
        .get(`/todo.findAll`)
        .expect(200)
        .then(() => {
          expect(todoServiceMock.findAll).toBeCalled();
          expect(todoServiceMock.findAll).toBeCalledTimes(1);
        });
    });
  });
});
