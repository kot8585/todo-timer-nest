import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entity/category.entity';
import { CreateCategoryDto } from 'src/entity/req/create-category.dto';
import { GetCategoriesAndTodosDto } from 'src/entity/res/get-categories-and-todos-dto';
import { Timeline } from 'src/entity/timeline.entity';
import { Todo } from 'src/entity/todo.entity';
import { Repository } from 'typeorm';
import { EditCategoryDto } from '../entity/req/edit-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async getAllCategoriesAndTodos(
    userUid,
    startDateUtc,
    endDateUtc,
  ): Promise<GetCategoriesAndTodosDto[]> {
    const result = await this.categoryRepository
      .createQueryBuilder('category')
      .select([
        'category.idx AS categoryIdx',
        'category.title AS categoryTitle',
        'category.color AS categoryColor',
        'todo.idx AS todoIdx',
        'todo.title AS todoTitle',
        'todo.isCompleted AS isCompleted',
        'COALESCE(todo.color, category.color) AS todoColor',
        'COALESCE(SUM(timeline.executionTime), 0) AS todoExecutionTime',
      ])
      .leftJoin(
        Todo,
        'todo',
        'todo.categoryIdx = category.idx AND todo.startDate BETWEEN :startDate AND :endDate',
        {
          startDate: startDateUtc.format(),
          endDate: endDateUtc.format(),
        },
      )
      .leftJoin(
        Timeline,
        'timeline',
        'todo.idx = timeline.todoIdx AND timeline.startDateTime BETWEEN :startDate AND :endDate',
        {
          startDate: startDateUtc.format(),
          endDate: endDateUtc.format(),
        },
      )
      .where('category.userUid = :userUid', {
        // userUid: req.query.userUid,
        userUid: userUid,
      })
      .groupBy('todo.idx, category.idx')
      .getRawMany();

    console.log('result: ', result);

    const formattedResult = result.reduce((acc, curr) => {
      // 카테고리가 이미 있는지 확인하고 없으면 새로운 객체를 만듭니다.
      if (!acc[curr.categoryIdx]) {
        acc[curr.categoryIdx] = {
          idx: curr.categoryIdx,
          title: curr.categoryTitle,
          color: curr.categoryColor,
          data: [],
          executionTime: 0, // 카테고리 실행 시간 초기화
        };
      }

      // 할 일 항목을 생성하고 결과에 추가합니다.
      if (curr.todoIdx) {
        acc[curr.categoryIdx].data.push({
          idx: curr.todoIdx,
          title: curr.todoTitle,
          isCompleted: curr.isCompleted,
          color: curr.todoColor,
          executionTime: Number(curr.todoExecutionTime),
        });
        // 할 일 항목의 실행 시간을 카테고리의 실행 시간에 추가합니다.
        acc[curr.categoryIdx].executionTime += Number(curr.todoExecutionTime);
      }

      return acc;
    }, {});

    // 객체를 배열로 변환합니다.
    const finalResult = Object.values(formattedResult);
    return finalResult;
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<boolean> {
    const result = await this.categoryRepository.save(createCategoryDto);
    return !!result;
  }

  async edit(
    categoryIdx: number,
    editCategoryDto: EditCategoryDto,
  ): Promise<boolean> {
    const result = await this.categoryRepository.update(
      categoryIdx,
      editCategoryDto,
    );

    if (result.affected && result.affected > 0) {
      return true;
    } else {
      throw new NotFoundException(`해당 카테고리를 찾을 수 없습니다.`);
    }
  }

  async delete(categoryIdx: number): Promise<boolean> {
    const result = await this.categoryRepository.delete(categoryIdx);

    if (result.affected && result.affected > 0) {
      return true;
    } else {
      throw new NotFoundException(`해당 카테고리를 찾을 수 없습니다.`);
    }
  }
}
