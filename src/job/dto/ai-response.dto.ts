import { Expose } from 'class-transformer';

export class JobInformationDto {
  @Expose()
  job_title: string;

  @Expose()
  recruitment_count: number;

  @Expose()
  job_description: string;

  @Expose()
  qualifications: string;

  @Expose()
  working_hours: string;

  @Expose()
  work_type: string;

  @Expose()
  internship_pay: string;

  @Expose()
  salary: string;

  @Expose()
  additional_requirements: string;
}

export class CompanyInformationDto {
  @Expose()
  company_name: string;

  @Expose()
  year: number;

  @Expose()
  business_type: string;

  @Expose()
  employee_count: number;

  @Expose()
  main_business: string;

  @Expose()
  website: string;

  @Expose()
  address: string;

  @Expose()
  ai_analysis: string; // AI 분석 결과를 저장하는 필드
}

export class AIResponseDto {
  company_information: CompanyInformationDto;
  job_information: JobInformationDto;
}
