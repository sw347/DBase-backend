import { Body, Controller, Get, Patch, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './decorator/user.decorator';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { UserProfileDto } from './dto/user-profile.dto';
import { Response } from 'express';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  async getUserProfile(@User() user: UserEntity): Promise<UserProfileDto> {
    return { id: user.id, name: user.name, createdAt: user.createdAt };
  }

  @Patch('/profile/update')
  @UseGuards(JwtAuthGuard)
  async updateUserProfile(
    @User() user: UserEntity,
    @Body() updateUserDto: UpdateUserProfileDto,
    @Res() res: Response,
  ) {
    return await this.userService.updateUserProfile(user.id, updateUserDto);
  }
}
