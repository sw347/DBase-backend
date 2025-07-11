import { Module } from '@nestjs/common';
import { ApplyService } from './apply.service';
import { ApplyController } from './apply.controller';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';

@Module({
  imports: [JwtAuthGuard, UserService, TypeOrmModule.forFeature([UserEntity])],
  controllers: [ApplyController],
  providers: [ApplyService],
})
export class ApplyModule {}
