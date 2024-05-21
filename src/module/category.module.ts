import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from 'src/controller/category.controller';
import { Category } from 'src/entity/category.entity';
import { CategoryService } from 'src/service/category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
