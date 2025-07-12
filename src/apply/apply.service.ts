import { ApplicationFileEntity } from './entities/application-file.entity';
import { Body, Injectable, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import * as fs from 'fs';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationStatusEntity } from './entities/application-status.entity';
import { Repository } from 'typeorm';
import { JobInformationEntity } from 'src/job/entities/job-information.entity';

@Injectable()
export class ApplyService {
  constructor(
    private readonly userService: UserService,

    @InjectRepository(ApplicationStatusEntity)
    private readonly applicationStatusRepository: Repository<ApplicationStatusEntity>,
    @InjectRepository(JobInformationEntity)
    private readonly jobInformationRepository: Repository<JobInformationEntity>,
    @InjectRepository(ApplicationFileEntity)
    private readonly applicationFileEntity: Repository<ApplicationFileEntity>,
  ) {}

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

    const job = await this.jobInformationRepository.findOne({
      where: { company_id: Number(companyId) },
    });
    if (!job) throw new Error('apply service: job not found');

    const application = await this.applicationStatusRepository.save({
      user_id: userId,
      job_id: job.id,
      status: '미확인',
      feedback: null,
    });

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

    const resumePath = files.resume?.[0] ? moveFile(files.resume[0]) : null;
    const portfolioPath = files.portfolio?.[0]
      ? moveFile(files.portfolio[0])
      : null;
    const etcPaths = files.etcFile?.map((file) => moveFile(file)) ?? [];

    const applicationFile = this.applicationFileEntity.create({
      application: application,
      resumePath,
      portfolioPath,
      etcFiles: etcPaths,
    });

    await this.applicationFileEntity.save(applicationFile);

    return {
      success: true,
      applicationId: application.id,
      message: '지원서가 성공적으로 제출되었습니다.',
    };
  }

  async getApplicationStatus() {}
}
