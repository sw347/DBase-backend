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
            fs.mkdirSync('./uploads/jobInformation', { recursive: true });
          }

          const length = fs.readdirSync('./uploads/jobInformation').length;

          fs.mkdirSync(`./uploads/jobInformation/${length + 1}`);

          cb(null, `./uploads/jobInformation/${length + 1}`); // 파일 저장 경로 설정
        },
        filename: function (req, file, cb) {
          const filename = file.originalname;

          cb(null, filename);
        },
      }),
    }),
  )
  async inputJob(@UploadedFile() file: Express.Multer.File): Promise<void> {
    this.jobService.receivedFile();
    // this.jobService.sendFile(file.originalname); // 인공지능 서버에 파일 전송
  }

  @Get()
  async findAll() {
    return this.jobService.findAll();
  }
}
