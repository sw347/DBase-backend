export class JobInformationDto {
  job_title: string;
  recruitment_count: number;
  job_description: string;
  qualifications: string;
  working_hours: string;
  work_type: string;
  internship_pay: string;
  salary: string;
  additional_requirements: string;
}

export class CompanyInformationDto {
  company_name: string;
  year: number;
  business_type: string;
  employee_count: number;
  main_business: string;
  website: string;
  address: string;
  ai_analysis: string; // AI 분석 결과를 저장하는 필드
}

export class AIResponseDto {
  company_information: CompanyInformationDto;
  job_information: JobInformationDto;
}
