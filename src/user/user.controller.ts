import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './decorator/user.decorator';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { UserProfileDto } from './dto/user-profile.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  async getUserProfile(@User() user: UserEntity): Promise<UserProfileDto> {
    return { id: user.id, name: user.name, createdAt: user.createdAt };
  }
}
