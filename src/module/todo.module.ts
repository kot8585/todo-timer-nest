import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from 'src/controller/todo.controller';
import { Todo } from 'src/entity/todo.entity';
import { TodoService } from 'src/service/todo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  exports: [TypeOrmModule],
  providers: [TodoService],
  controllers: [TodoController],
})
export class TodoModule {}
