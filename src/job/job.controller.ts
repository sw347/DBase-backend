import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { JobService } from './job.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import { Request, Response } from 'express';
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
  async inputJob(@Req() req: Request, @Res() res: Response) {
    const pdfFile = req.query.fileName as string;

    if (!pdfFile) {
      throw new Error('PDF 파일 이름이 필요합니다.');
    }

    const result = await this.jobService.sendFile(pdfFile); // 인공지능 서버에 파일 전송
    res.status(201).json(result); // 결과를 클라이언트에 반환
  }

  @Patch('/input/update')
  async updateCompany(@Body() body: UpdateCompanyDto) {
    return this.jobService.updateCompanyAndJob(body);
  }

  @Get()
  async getJobs() {
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
