import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimelineController } from 'src/controller/timeline.controller';
import { Timeline } from 'src/entity/timeline.entity';
import { TimelineService } from 'src/service/timeline.service';

@Module({
  imports: [TypeOrmModule.forFeature([Timeline])],
  providers: [TimelineService],
  controllers: [TimelineController],
})
export class TimelineModule {}
