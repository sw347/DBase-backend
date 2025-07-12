import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApplyService } from './apply.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';

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

  @Get('/status')
  @UseGuards(JwtAuthGuard)
  async getApplicationStatus() {
    return this.applyService.getApplicationStatus();
  }
}
