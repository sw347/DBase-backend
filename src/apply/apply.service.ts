import { Body, Injectable, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import * as fs from 'fs';

@Injectable()
export class ApplyService {
  constructor(private readonly userService: UserService) {}

  async inputApply(
    files: {
      resume: Express.Multer.File;
      portfolio: Express.Multer.File;
      etcFile: Express.Multer.File[];
    },
    @Body() body: { companyId: string },
    @Req() req: Request,
  ) {
    const identifier = req.cookies['identifier'];
    const user = await this.userService.findUserByIdentifier(identifier);
    const userId = user.id;
    const companyId = body.companyId;

    const basePath = `./uploads/${companyId}/${userId}`;
    if (!fs.existsSync(basePath)) {
      fs.mkdirSync(basePath, { recursive: true });
    }

    const moveFile = (file: Express.Multer.File) => {
      const newPath = `${basePath}/${file.originalname}`;
      fs.renameSync(file.path, newPath);
      return newPath;
    };

    const savedFiles = {
      resume: files.resume?.[0] ? moveFile(files.resume[0]) : null,
      portfolio: files.portfolio?.[0] ? moveFile(files.portfolio[0]) : null,
      etcFiles: files.etcFile?.map((file) => moveFile(file)) ?? [],
    };

    return {
      success: true,
      savedFiles,
    };
  }
}
