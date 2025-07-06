import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SocialLoginEntity } from './social-login.entity';

@Entity({ name: 'user', database: 'company_db' })
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'email', type: 'varchar', length: 191, unique: true })
  email: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 191,
    nullable: false,
  })
  name: string;

  @Column({ name: 'role', type: 'varchar' })
  role: string;

  @Column({ name: 'created_at', type: 'bigint', nullable: false })
  createdAt: number;

  @OneToOne(() => SocialLoginEntity, (socialLogin) => socialLogin.user, {
    createForeignKeyConstraints: false,
  })
  socialLogin: SocialLoginEntity;
}
