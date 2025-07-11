import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { JobService } from './job.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import { Request } from 'express';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post('/input')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'file',
          maxCount: 1,
        },
        {
          name: 'etcFile',
          maxCount: 2,
        },
      ],
      {
        storage: diskStorage({
          destination: function (req, file, cb) {
            if (!fs.existsSync('./uploads')) {
              fs.mkdirSync('./uploads', { recursive: true });
            }

            const length = fs.readdirSync('./uploads').length;

            const dir = `./uploads/${length + 1}`;
            if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir, {
                recursive: true,
              });
            }

            cb(null, dir); // 파일 저장 경로 설정
          },
          filename: function (req, file, cb) {
            cb(null, file.originalname);
          },
        }),
      },
    ),
  )
  async inputJob(
    @UploadedFiles()
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
