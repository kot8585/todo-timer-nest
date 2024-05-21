import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/entity/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}
}
