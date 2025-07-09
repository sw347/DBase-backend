import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { JobService } from './job.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post('/input')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: function (req, file, cb) {
          if (!fs.existsSync('./uploads')) {
            fs.mkdirSync('./uploads', { recursive: true });
          }

          cb(null, './uploads');
        },
        filename: function (req, file, cb) {
          const filename = file.originalname;

          cb(null, filename);
        },
      }),
    }),
  )
  async inputJob(@UploadedFile() file: Express.Multer.File): Promise<void> {
    // this.jobService.sendFile(file.originalname); // 인공지능 서버에 파일 전송
  }

  @Get()
  async findAll() {
    return this.jobService.findAll();
  }
}
