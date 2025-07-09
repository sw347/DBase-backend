import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class RoadmapService {
  getMarkdown(): string {
    const filePath = path.join(process.cwd(), 'roadmap_file', 'roadmap.md');
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Roadmap file not found');
    }
    return fs.readFileSync(filePath, 'utf-8');
  }
}
