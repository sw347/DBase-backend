import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { JobModule } from 'src/job/job.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';

@Module({
  imports: [JobModule, AuthModule],
  controllers: [EmployeeController],
  providers: [EmployeeService, JwtAuthGuard],
})
export class EmployeeModule {}
