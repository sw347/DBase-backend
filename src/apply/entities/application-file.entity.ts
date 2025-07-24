import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApplicationStatusEntity } from './application-status.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { CompanyInformationEntity } from 'src/job/entities/company-information.entity';

@Entity({ name: 'application_file', database: 'DBase' })
export class ApplicationFileEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'user_id', type: 'int', nullable: false })
  userId: number;

  @Column({ name: 'company_id', type: 'int', nullable: false })
  companyId: number;

  @Column({
    name: 'resume_path',
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  resumePath: string;

  @Column({
    name: 'portfolio_path',
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  portfolioPath: string;

  @Column({
    name: 'etc_files',
    type: 'simple-array',
    nullable: true,
  })
  etcFiles: string[];

  @OneToOne(() => ApplicationStatusEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'application_id' })
  application: ApplicationStatusEntity;

  @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => CompanyInformationEntity, (company) => company.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: CompanyInformationEntity;
}
