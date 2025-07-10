import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { CompanyInformationEntity } from './company-information.entity';
import { ApplicationStatusEntity } from './application-status.entity';

@Entity({ name: 'job_information', database: 'DBase' })
export class JobInformationEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'company_id', type: 'int' })
  company_id: number;

  @ManyToOne(() => CompanyInformationEntity, (company) => company.jobs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: CompanyInformationEntity;

  @Column({ name: 'job_title', type: 'varchar', length: 255 })
  job_title: string;

  @Column({ name: 'recruitment_count', type: 'int' })
  recruitment_count: number;

  @Column({ name: 'job_description', type: 'varchar' })
  job_description: string;

  @Column({ name: 'qualifications', type: 'varchar', length: 255 })
  qualifications: string;

  @Column({ name: 'working_hours', type: 'varchar', length: 255 })
  working_hours: string;

  @Column({ name: 'work_type', type: 'varchar', length: 255 })
  work_type: string;

  @Column({ name: 'required_documents', type: 'varchar', length: 255 })
  required_documents: string;

  @Column({ name: 'internship_pay', type: 'varchar', length: 50 })
  internship_pay: string;

  @Column({ name: 'salary', type: 'varchar', length: 50 })
  salary: string;

  @Column({ name: 'additional_requirements', type: 'text' })
  additional_requirements: string;

  @OneToMany(() => ApplicationStatusEntity, (application) => application.job, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  applications: ApplicationStatusEntity[];
}
