import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { JobInformationEntity } from './entities/job-information.entity';
import { CompanyInformationEntity } from './entities/company-information.entity';
import * as fs from 'fs';
import { Repository } from 'typeorm';
import {
  AIResponseDto,
  CompanyInformationDto,
  JobInformationDto,
} from './dto/ai-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanysDto } from './dto/company.dto';
import { EmployedCompanyDto } from './dto/employed-company.dto';
import { plainToInstance } from 'class-transformer';
import { PresentCompanyEntity } from './entities/present-company.entity';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(JobInformationEntity)
    private readonly jobInformationRepository: Repository<JobInformationEntity>,
    @InjectRepository(CompanyInformationEntity)
    private readonly companyInformationRepository: Repository<CompanyInformationEntity>,
    @InjectRepository(PresentCompanyEntity)
    private readonly presentCompanyRepository: Repository<PresentCompanyEntity>,
  ) {}

  async sendFile(fileName: string) {
    const folderId = fs.readdirSync('uploads').length - 1; // 다른 방식 필요

    try {
      // 폴더 이름 저장하기 folderId
      await axios
        .post('http://localhost:3000/api/process-pdf', {
          folderId,
          fileName,
        })
        .then(async (response) => {
          //   console.log('AI 서버로부터 메시지 응답:', response.data.message);
          console.log('AI 서버로부터 상태 응답:', response.data.status);

          if (response.data.status !== 'success') {
            return { success: false, message: response.data.message };
          }

          const company = await this.companyInformationRepository.findOne({
            where: { id: folderId },
          });

          const job = await this.jobInformationRepository.findOne({
            where: { company_id: folderId },
          });

          if (!company || !job) {
            return {
              success: false,
              message: 'company와 job 데이터가 비어있습니다.',
            };
          }

          const companyInformation: CompanyInformationDto = plainToInstance(
            CompanyInformationDto,
            company,
            {
              excludeExtraneousValues: true,
            },
          );
          const jobInformation: JobInformationDto = plainToInstance(
            JobInformationDto,
            job,
            {
              excludeExtraneousValues: true,
            },
          );

          const result: AIResponseDto = {
            company_information: companyInformation,
            job_information: jobInformation,
          };

          await this.presentCompanyRepository.save({
            company_id: company.id,
            company: company,
          });

          return result;
        })
        .catch((error) => {
          console.error('Error processing PDF:', error);
        });
    } catch (error) {
      console.error('Error sending file:', error);
    }
  }

  async findAll() {
    const companies = await this.companyInformationRepository.find();

    if (!companies || companies.length === 0) {
      return { success: false, message: '데이터가 비어있습니다.' };
    }

    const result: CompanysDto[] = companies as CompanysDto[];

    return { success: true, result };
  }

  async findCompany(id: number) {
    const company = await this.companyInformationRepository.findOne({
      where: { id },
      relations: ['jobs'],
    });

    return company;
  }

  async findPinnedCompany(id: number) {
    const company = await this.companyInformationRepository.findOne({
      where: { id },
    });

    if (!company) return null;

    const result: EmployedCompanyDto = plainToInstance(
      EmployedCompanyDto,
      company,
      { excludeExtraneousValues: true },
    );
  }

  async findAllEmployedStatus() {
    return this.presentCompanyRepository.find();
  }
}
