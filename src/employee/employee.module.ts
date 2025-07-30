import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { JobModule } from 'src/job/job.module';
import { UserCompanyEntity } from 'src/user/entities/user.company.entity';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';

@Module({
  imports: [
    JobModule,
    AuthModule,
    TypeOrmModule.forFeature([UserCompanyEntity]),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, JwtAuthGuard],
})
export class EmployeeModule {}
