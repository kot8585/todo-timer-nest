import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Category } from './entity/category.entity';
import { Timeline } from './entity/timeline.entity';
import { Todo } from './entity/todo.entity';
import { CategoryModule } from './module/category.module';
import { TimelineModule } from './module/timeline.module';
import { TodoModule } from './module/todo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '0000',
      database: 'todolist',
      entities: [Category, Todo, Timeline],
      synchronize: true, // 엔티티 동기화 여부, 개발 중일땐 true를 해도 상관없으나 실서버에서는 false로 하고 migration을 하거나, 직접 수정한다.
      logging: true,
      timezone: 'Z',
    }),
    CategoryModule,
    TimelineModule,
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

// https://docs.nestjs.com/techniques/database 참고하기 졸려..
