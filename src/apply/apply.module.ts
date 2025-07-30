import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { CompanyInformationEntity } from 'src/job/entities/company-information.entity';
import { JobInformationEntity } from 'src/job/entities/job-information.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { ApplyController } from './apply.controller';
import { ApplyService } from './apply.service';
import { ApplicationFileEntity } from './entities/application-file.entity';
import { ApplicationStatusEntity } from './entities/application-status.entity';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([
      ApplicationFileEntity,
      ApplicationStatusEntity,
      UserEntity,
      JobInformationEntity,
      CompanyInformationEntity,
    ]),
    AuthModule,
    UserModule,
  ],
  controllers: [ApplyController],
  providers: [ApplyService, JwtAuthGuard],
})
export class ApplyModule {}
