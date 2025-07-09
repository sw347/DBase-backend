import { Controller, Get } from '@nestjs/common';
import { RoadmapService } from './roadmap.service';

@Controller('roadmap')
export class RoadmapController {
  constructor(private readonly roadmapService: RoadmapService) {}

  @Get()
  getRoadmap() {
    const content = this.roadmapService.getMarkdown();
    return { content };
  }
}
