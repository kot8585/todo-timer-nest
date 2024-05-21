import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { TodoService } from 'src/service/todo.service';

dayjs.extend(utc);

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAll(
    @Param('selectedDate') selectedDate: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.status(HttpStatus.OK);
  }

  @Get(':id')
  findOne(@Param() params: any): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }

  @Post()
  create(): boolean {
    return true;
  }

  @Delete()
  delete(): boolean {
    return true;
  }
}
