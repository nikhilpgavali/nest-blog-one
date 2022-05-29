import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './controllers/todo.controller';
import { TodoService } from './services/todo.service';
import { Todo } from './entities/todo.entity';
import { TodoRepository } from './repository/todo.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'nik',
      entities: [Todo],
    }),
  ],
  controllers: [TodoController],
  providers: [TodoService, TodoRepository],
})
export class AppModule {}
