import {
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './google/google.guard';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/decorator/user.decorator';
import { OauthUserDto } from './dto/oauth-user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(GoogleAuthGuard)
  @Get('/google')
  async auth() {
    return HttpStatus.OK;
  }

  @UseGuards(GoogleAuthGuard)
  @Get('/google/callback')
  async authCallback(
    @User() user: OauthUserDto,
    @Res() response: Response,
  ): Promise<void> {
    const redirectHref =
      process.env.LOCAL === 'true'
        ? 'http://localhost:5173'
        : 'https://dbase.o-r.kr/';

    try {
      const { accessToken, refreshToken } = await this.authService.login(user);

      response.cookie('accessToken', accessToken, {
        maxAge: 3600000, // 1 hour
      });

      response.cookie('refreshToken', refreshToken);
      response.redirect(redirectHref); // 다시 돌아올 경로
    } catch (error) {
      console.error(error);

      return response.redirect(redirectHref);
    }
  }
}
