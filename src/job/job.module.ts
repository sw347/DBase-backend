import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationStatusEntity } from '../apply/entities/application-status.entity';
import { CompanyInformationEntity } from './entities/company-information.entity';
import { JobInformationEntity } from './entities/job-information.entity';
import { PresentCompanyEntity } from './entities/present-company.entity';
import { JobController } from './job.controller';
import { JobService } from './job.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ApplicationStatusEntity,
      CompanyInformationEntity,
      JobInformationEntity,
      PresentCompanyEntity,
    ]),
  ],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
