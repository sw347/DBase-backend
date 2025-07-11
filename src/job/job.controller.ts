import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { JobService } from './job.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import { Request } from 'express';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post('/input')
  @UseInterceptors(
    FilesInterceptor('file', 3, {
      storage: diskStorage({
        destination: function (req, file, cb) {
          if (!fs.existsSync('./uploads/jobInformation')) {
            fs.mkdirSync('./uploads/jobInformation', { recursive: true });
          }

          const length = fs.readdirSync('./uploads/jobInformation').length;

          if (!fs.existsSync(`./uploads/jobInformation/${length + 1}`)) {
            fs.mkdirSync(`./uploads/jobInformation/${length + 1}`, {
              recursive: true,
            });
          }

          cb(null, `./uploads/jobInformation/${length + 1}`); // 파일 저장 경로 설정
        },
        filename: function (req, file, cb) {
          const filename = file.originalname;

          cb(null, filename);
        },
      }),
    }),
  )
  async inputJob(
    @UploadedFile()
    files: {
      file: Express.Multer.File;
      etcFile: Express.Multer.File[];
    },
  ) {
    return this.jobService.sendFile(files.file.originalname); // 인공지능 서버에 파일 전송
  }

  @Get()
  async findAll() {
    return this.jobService.findAll();
  }

  @Get('/company')
  async getCompany(@Req() req: Request) {
    const id: number = Number(req.query.id);

    return this.jobService.findCompany(id);
  }
}
