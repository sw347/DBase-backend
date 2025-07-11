import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { CompanyInformationEntity } from 'src/job/entities/company-information.entity';

@Entity({ name: 'user_company', database: 'DBase' })
export class UserCompanyEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'user_id', type: 'int', unique: true })
  user_id: number;

  @Column({ name: 'employment_status', type: 'varchar', length: 50 })
  employment_status: string;

  @Column({ name: 'desired_position', type: 'varchar', length: 100 })
  desired_position: string;

  @Column({ name: 'company_id', type: 'int' })
  company_id: number;

  @Column({ name: 'work_start_date', type: 'date' })
  work_start_date: Date;

  @Column({ name: 'work_end_date', type: 'date' })
  work_end_date: Date;

  @ManyToOne(() => UserEntity, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => CompanyInformationEntity, (company) => company.present, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: CompanyInformationEntity;
}
