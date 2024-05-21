import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { CategoryService } from 'src/service/category.service';
import { CreateCategoryDto } from 'src/entity/req/create-category.dto';
import { EditCategoryDto } from 'src/entity/req/edit-category.dto';

dayjs.extend(utc);

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findByDate(
    @Query('selectedDate') selectedDate: string,
    @Query('userUid') userUid: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const startDateUtc = dayjs.utc(selectedDate);
    const endDateUtc = startDateUtc.add(1, 'day').subtract(1, 'millisecond');

    res.status(HttpStatus.OK);
    const categoriesAndTodos =
      await this.categoryService.getAllCategoriesAndTodos(
        userUid,
        startDateUtc,
        endDateUtc,
      );

    return categoriesAndTodos;
  }

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto): Promise<boolean> {
    return await this.categoryService.create(createCategoryDto);
  }

  @Put(':categoryIdx')
  async edit(
    @Param('categoryIdx') categoryIdx: number,
    @Body() editCategoryDto: EditCategoryDto,
  ) {
    console.log('categoryIdx', categoryIdx);
    return await this.categoryService.edit(categoryIdx, editCategoryDto);
  }

  @Delete(':categoryIdx')
  async delete(@Param('categoryIdx') categoryIdx: number): Promise<boolean> {
    return await this.categoryService.delete(categoryIdx);
  }
}
