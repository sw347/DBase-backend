import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { JobService } from './job.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import { Request } from 'express';
import { UpdateCompanyDto } from './dto/update-company.dto';

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
          maxCount: 1,
        },
      ],
      {
        storage: diskStorage({
          destination: function (req: Request, file, cb) {
            if (!req['uploadFolder']) {
              if (!fs.existsSync('./uploads')) {
                fs.mkdirSync('./uploads', { recursive: true });
              }

              const length = fs.readdirSync('./uploads').length;

              const dir = `./uploads/${length}`;
              if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, {
                  recursive: true,
                });
              }

              req['uploadFolder'] = dir;
            }

            cb(null, req['uploadFolder']); // 파일 저장 경로 설정
          },
          filename: function (req: Request, file, cb) {
            const isEtc = req.query.etcFileName as string;
            const decodedName = req.query.fileName as string;

            let finalName: string;

            if (file.fieldname === 'file') {
              finalName = decodedName;
            } else if (file.fieldname === 'etcFile') {
              finalName = isEtc;
            }

            cb(null, finalName);
          },
        }),
      },
    ),
  )
  async inputJob(
    @UploadedFiles()
    files: {
      file: Express.Multer.File[];
      etcFile?: Express.Multer.File[];
    },
    @Req() req: Request,
  ) {
    const pdfFile = req.query.fileName as string;

    if (!pdfFile) {
      throw new Error('PDF 파일 이름이 필요합니다.');
    }

    console.log(pdfFile);

    return this.jobService.sendFile(pdfFile); // 인공지능 서버에 파일 전송
  }

  @Post('/input/update')
  async inputCompany(@Body() body: UpdateCompanyDto) {
    return this.jobService.updateCompanyAndJob(body);
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

  @Get('/company/pin')
  async getPinnedCompany(@Req() req: Request) {
    const id: number = Number(req.query.id);

    return this.jobService.findPinnedCompany(id);
  }

  @Get('/company/employed')
  async getAllEmployedStatus() {
    return this.jobService.findAllEmployedStatus();
  }
}
