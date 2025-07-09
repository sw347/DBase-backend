import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entities/user.entity';
import { SocialLoginEntity } from './user/entities/social-login.entity';
import { UserTokenEntity } from './user/entities/user-token.entity';
import { RoadmapModule } from './roadmap/roadmap.module';
import { JobModule } from './job/job.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DATABASE'),
        entities: [UserEntity, SocialLoginEntity, UserTokenEntity],
        synchronize: true, // true: 프로젝트 실행마다 Entity 생성, false: Entity 변경 시 수동으로 migration 필요
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    RoadmapModule,
    JobModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
