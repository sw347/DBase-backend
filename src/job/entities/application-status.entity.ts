import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { JobInformationEntity } from './job-information.entity';

@Entity({ name: 'application_status', database: 'DBase' })
export class ApplicationStatusEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'user_id', type: 'int' })
  user_id: number;

  @Column({ name: 'job_id', type: 'int' })
  job_id: number;

  @Column({ name: 'status', type: 'varchar', length: 50, default: '미확인' })
  status: string;

  @Column({ name: 'feedback', type: 'text', nullable: true })
  feedback: string | null;

  // 🔗 JobInformation과의 관계 (N:1)
  @ManyToOne(() => JobInformationEntity, (job) => job.applications, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'job_id' })
  job: JobInformationEntity;
}
