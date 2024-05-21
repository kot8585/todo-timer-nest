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
import { TimelineService } from 'src/service/timeline.service';

dayjs.extend(utc);

@Controller('timelines')
export class TimelineController {
  constructor(private readonly timelineService: TimelineService) {}

  @Get()
  async findAll(@Res({ passthrough: true }) res: Response) {
    res.status(HttpStatus.OK);
    return this.timelineService.find();
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
