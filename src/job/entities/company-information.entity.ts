import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { JobInformationEntity } from './job-information.entity';

@Entity({ name: 'company_information', database: 'DBase' })
export class CompanyInformationEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'year', type: 'int' })
  year: number;

  @Column({ name: 'company_name', type: 'varchar' })
  company_name: string;

  @Column({ name: 'deadline', type: 'varchar' })
  deadline: string;

  @Column({ name: 'establishment_year', type: 'int' })
  establishment_year: number;

  @Column({ name: 'business_type', type: 'varchar' })
  business_type: string;

  @Column({ name: 'employee_count', type: 'int' })
  employee_count: number;

  @Column({ name: 'main_business', type: 'varchar' })
  main_business: string;

  @Column({ name: 'website', type: 'varchar' })
  website: string;

  @Column({ name: 'address', type: 'varchar' })
  address: string;

  @Column({ name: 'ai_analysis', type: 'varchar', length: 255 })
  ai_analysis: string;

  // 🔄 JobInformation과의 관계
  @OneToMany(() => JobInformationEntity, (job) => job.company)
  jobs: JobInformationEntity[];
}
