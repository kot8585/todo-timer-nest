import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Timeline } from 'src/entity/timeline.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TimelineService {
  constructor(
    @InjectRepository(Timeline)
    private timelineRepository: Repository<Timeline>,
  ) {}

  find(): Promise<Timeline[]> {
    return this.timelineRepository.find();
  }
}
