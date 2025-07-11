import { DateTime } from 'luxon';
import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserTokenEntity } from './entities/user-token.entity';
import { ConfigService } from '@nestjs/config';
import { SocialLoginEntity } from './entities/social-login.entity';
import { LoginException } from 'src/auth/exception/login.exception';
import { OauthUserDto } from 'src/auth/dto/oauth-user.dto';
import { hash } from 'argon2';
import { UserCompanyEntity } from './entities/user.company.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserTokenEntity)
    private readonly userTokenRepository: Repository<UserTokenEntity>,
    @InjectRepository(SocialLoginEntity)
    private readonly socialLoginRepo: Repository<SocialLoginEntity>,

    private readonly configService: ConfigService,
  ) {}

  async findUserByIdentifier(identifier: string) {
    const social = await this.socialLoginRepo.findOne({
      where: { identifier },
      relations: ['user'],
    });

    if (!social) {
      return null;
    }

    return await this.userRepository.findOne({
      where: { id: social.userId },
    });
  }

  async createUser(oauthUser: OauthUserDto): Promise<UserEntity | null> {
    const now = DateTime.now().toMillis();

    const qr = this.dataSource.createQueryRunner();
    await qr.connect();
    await qr.startTransaction();

    let userId = 0;
    let category = 'student';

    try {
      if (!oauthUser.email.startsWith('sdh')) category = 'teacher';

      const result = await qr.manager.insert(UserEntity, {
        name: oauthUser.name,
        email: oauthUser.email,
        category: category,
        createdAt: now,
      });

      userId = result.identifiers[0].id;

      await qr.manager.insert(SocialLoginEntity, {
        identifier: oauthUser.identifier,
        userId,
      });

      await qr.manager.insert(UserCompanyEntity, {
        user_id: userId,
        employment_status: '구직중',
        desired_position: '',
        company_id: null,
        work_start_date: null,
        work_end_date: null,
      });

      await qr.commitTransaction();
    } catch (err) {
      await qr.rollbackTransaction();

      userId = 0;
    } finally {
      await qr.release();
    }

    if (userId === 0) return null;

    return this.userRepository.create({
      id: userId,
      name: oauthUser.name,
      email: oauthUser.email,
      category: category,
      createdAt: now,
    });
  }

  async updateOrCreateToken(
    userId: number,
    refreshToken: string,
  ): Promise<void> {
    const isTokenExists = await this.userTokenRepository.exists({
      where: { userId },
    });

    const hashedToken = await this.createHashToken(refreshToken);

    if (!isTokenExists) {
      await this.userTokenRepository.insert({
        userId,
        refreshToken: hashedToken,
      });
    } else {
      await this.userTokenRepository.update(
        { userId },
        { refreshToken: hashedToken },
      );
    }
  }

  async createHashToken(token: string): Promise<string> {
    return await hash(token, { raw: false });
  }

  async findOneById(userId: string) {
    const user = await this.socialLoginRepo.findOne({
      where: { identifier: userId },
    });

    return await this.userRepository.findOne({
      where: { id: user.id },
    });
  }
}
