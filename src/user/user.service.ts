import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { hash } from 'argon2';
import { plainToInstance } from 'class-transformer';
import { DateTime } from 'luxon';
import { OauthUserDto } from 'src/auth/dto/oauth-user.dto';
import { CompanyInformationEntity } from 'src/job/entities/company-information.entity';
import { PresentCompanyEntity } from 'src/job/entities/present-company.entity';
import { DataSource, Repository } from 'typeorm';
import {
  CompanyDto,
  ExperiencesDto,
  PersonalProfileDto,
  UserProfileDto,
} from './dto/personal-profile.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { UpdateSkillsDto } from './dto/update-skills.dto';
import { UpdateUserCompanyStatusDto } from './dto/update-user-company-status.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { SocialLoginEntity } from './entities/social-login.entity';
import { UserTokenEntity } from './entities/user-token.entity';
import { UserCompanyEntity } from './entities/user.company.entity';
import { UserEntity } from './entities/user.entity';
import { UserExperienceEntity } from './entities/user.experience.entity';

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
    @InjectRepository(CompanyInformationEntity)
    private readonly companyInformationRepository: Repository<CompanyInformationEntity>,
    @InjectRepository(UserCompanyEntity)
    private readonly userCompanyRepository: Repository<UserCompanyEntity>,
    @InjectRepository(PresentCompanyEntity)
    private readonly presentCompanyRepository: Repository<PresentCompanyEntity>,
    @InjectRepository(UserExperienceEntity)
    private readonly userExperienceRepository: Repository<UserExperienceEntity>,
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
      if (!oauthUser.email.includes('@sdh.hs.kr')) {
        return null;
      }

      if (oauthUser.email.match('sdh230304')) category = 'teacher';
      else if (oauthUser.email.match('sdh230303')) category = 'teacher';
      else if (oauthUser.email.match('sdh230310')) category = 'teacher';
      else if (oauthUser.email.match('sdh230406')) category = 'teacher';
      else if (!oauthUser.email.startsWith('sdh')) category = 'teacher';

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
        userId: userId,
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

  async findOneByIdentifier(identifier: string) {
    const social = await this.socialLoginRepo.findOne({
      where: { identifier },
    });

    return await this.userRepository.findOne({ where: { id: social.userId } });
  }

  async findOneById(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async updateUserProfile(userId: number, updateUserDto: UpdateUserProfileDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });

      user.phone_number = updateUserDto.phone_number;
      user.address = updateUserDto.address;
      user.affiliation = updateUserDto.affiliation;

      await this.userRepository.save(user);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: '프로필 업데이트에 실패했습니다.',
      };
    }
  }

  async getPersonalUserData(id: string) {
    const userData = await this.userRepository.findOne({
      where: { id: Number(id) },
      relations: ['company', 'experiences'],
    });

    const user = plainToInstance(UserProfileDto, userData, {
      excludeExtraneousValues: true,
    });

    const company = plainToInstance(CompanyDto, userData.company, {
      excludeExtraneousValues: true,
    });

    const experiences = (userData.experiences || []).map((exp) =>
      plainToInstance(ExperiencesDto, exp, { excludeExtraneousValues: true }),
    );

    const result: PersonalProfileDto = {
      user_profile: user,
      company: company,
      experiences: experiences,
    };

    return result;
  }

  async getUserPersonalProfile(userId: number) {
    const userData = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['company', 'experiences'],
    });

    if (!userData) throw new Error('사용자를 찾을 수 없습니다.');

    const user = plainToInstance(UserProfileDto, userData, {
      excludeExtraneousValues: true,
    });

    const company = plainToInstance(CompanyDto, userData.company, {
      excludeExtraneousValues: true,
    });

    const experiences = (userData.experiences || []).map((exp) =>
      plainToInstance(ExperiencesDto, exp, { excludeExtraneousValues: true }),
    );

    const result: PersonalProfileDto = {
      user_profile: user,
      company: company,
      experiences: experiences,
    };

    return result;
  }

  async updateUserCompanyStatus(
    userId: number,
    dto: UpdateUserCompanyStatusDto,
  ) {
    switch (dto.employment_status) {
      case '구직중':
        await this.jobSearchStatus(userId);
        break;
      case '취업 완료':
        await this.employmentStatus(userId, dto);
        break;
    }

    return { success: true, message: '업데이트 완료' };
  }

  async jobSearchStatus(userId: number) {
    const userCompany = await this.userCompanyRepository.findOne({
      where: {
        userId: userId,
      },
      relations: ['company'], // 회사 정보도 함께 불러오기
    });

    if (!userCompany) {
      throw new Error('해당 유저의 회사 정보가 없습니다.');
    }

    userCompany.company_id = null;
    userCompany.company_name = null;
    userCompany.employment_status = '구직중';
    userCompany.desired_position = null;
    userCompany.work_start_date = null;
    userCompany.work_end_date = null;

    await this.userCompanyRepository.save(userCompany);
  }

  async employmentStatus(userId: number, dto: UpdateUserCompanyStatusDto) {
    const userCompany = await this.userCompanyRepository.findOne({
      where: {
        userId: userId,
      },
      relations: ['company'], // 회사 정보도 함께 불러오기
    });

    if (!userCompany) {
      throw new Error('해당 유저의 회사 정보가 없습니다.');
    }

    let company = await this.companyInformationRepository.findOne({
      where: { company_name: dto.company_name },
    });

    if (!company) {
      throw new Error('해당 회사가 존재하지 않습니다.');
    }

    userCompany.company_name = dto.company_name;
    userCompany.employment_status = dto.employment_status;
    userCompany.desired_position = dto.desired_position;
    userCompany.company_id = company.id;
    userCompany.work_start_date = dto.work_start_date;
    userCompany.work_end_date = dto.work_end_date;

    await this.userCompanyRepository.save(userCompany);

    const alreadyExists = await this.presentCompanyRepository.findOne({
      where: { company_id: company.id },
    });

    if (!alreadyExists) {
      await this.presentCompanyRepository.save({
        company_id: company.id,
        company: company,
      });
    }
  }

  async updateUserSkillsStatus(userId: number, dto: UpdateSkillsDto) {
    const userData = await this.userRepository.findOne({
      where: { id: userId },
    });

    const currentSkills = (userData.skills || '')
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const newSkills = (dto.skills || '')
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const uniqueSkills = Array.from(new Set([...currentSkills, ...newSkills]));

    userData.skills = uniqueSkills.join(',');

    await this.userRepository.save(userData);
  }

  async updateUserExperience(userId: number, dto: UpdateExperienceDto) {
    const newExperience = this.userExperienceRepository.create({
      ...dto,
      userId,
    });

    const result = await this.userExperienceRepository.save(newExperience);

    return { success: true, data: result };
  }

  async categoryCheck(userId: number): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (user.category === 'teacher') return true;
    else return false;
  }

  async userName(userId: number): Promise<string> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    return user.name;
  }
}
