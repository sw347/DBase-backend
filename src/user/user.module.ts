import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { SocialLoginEntity } from './entities/social-login.entity';
import { UserTokenEntity } from './entities/user-token.entity';
import { AuthService } from '../auth/auth.service';
import { UserExperienceEntity } from './entities/user.experience.entity';
import { UserCompanyEntity } from './entities/user.company.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      SocialLoginEntity,
      UserTokenEntity,
      UserExperienceEntity,
      UserCompanyEntity,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService],
  exports: [UserService],
})
export class UserModule {}
