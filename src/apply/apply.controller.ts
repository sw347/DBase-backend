import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApplyService } from './apply.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request } from 'express';

@Controller('apply')
export class ApplyController {
  constructor(private readonly applyService: ApplyService) {}

  @Post('/input')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'resume',
          maxCount: 1,
        },
        {
          name: 'portfolio',
          maxCount: 1,
        },
        {
          name: 'etcFile',
          maxCount: 3,
        },
      ],
      {
        storage: diskStorage({
          destination: `./uploads/temp`,
          filename: (req, file, cb) => {
            cb(null, file.originalname);
          },
        }),
      },
    ),
  )
  async postApply(
    @UploadedFiles()
    files: {
      resume: Express.Multer.File;
      portfolio: Express.Multer.File;
      etcFile: Express.Multer.File[];
    },
    @Body() body: { companyId: string },
    @Req() req: Request,
  ) {
    return await this.applyService.inputApply(files, body, req);
  }
}
