import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationFileEntity } from 'src/apply/entities/application-file.entity';
import { CompanyInformationEntity } from 'src/job/entities/company-information.entity';
import { PresentCompanyEntity } from 'src/job/entities/present-company.entity';
import { AuthService } from '../auth/auth.service';
import { SocialLoginEntity } from './entities/social-login.entity';
import { UserTokenEntity } from './entities/user-token.entity';
import { UserCompanyEntity } from './entities/user.company.entity';
import { UserEntity } from './entities/user.entity';
import { UserExperienceEntity } from './entities/user.experience.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      SocialLoginEntity,
      UserTokenEntity,
      UserExperienceEntity,
      UserCompanyEntity,
      CompanyInformationEntity,
      PresentCompanyEntity,
      ApplicationFileEntity,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService],
  exports: [UserService],
})
export class UserModule {}
