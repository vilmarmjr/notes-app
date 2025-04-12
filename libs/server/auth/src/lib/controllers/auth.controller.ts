import {
  ChangePasswordRequestDto,
  ChangePasswordResponseDto,
  changePasswordSchema,
  LogInResponseDto,
  RefreshTokenResponseDto,
  SignUpRequestDto,
  signUpRequestSchema,
  SignUpResponseDto,
} from '@common/models';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApplicationRequest, Public, validateSchema } from '@server/shared';
import { Response } from 'express';
import { Transactional } from 'typeorm-transactional';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';
import { extractRefreshTokenFromCookies } from '../utils/request.util';
import { clearRefreshTokenCookie, setRefreshTokenCookie } from '../utils/response.util';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Transactional()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async logIn(
    @Req() req: ApplicationRequest,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LogInResponseDto> {
    const { accessToken, refreshToken } = await this.authService.signIn(
      req.user.id,
      req.user.email,
    );
    setRefreshTokenCookie(refreshToken, res);
    return { accessToken };
  }

  @Transactional()
  @Public()
  @Post('signup')
  async signUp(
    @Body(validateSchema(signUpRequestSchema)) dto: SignUpRequestDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<SignUpResponseDto> {
    const { accessToken, refreshToken } = await this.authService.signUp(dto);
    setRefreshTokenCookie(refreshToken, res);
    return { accessToken };
  }

  @Transactional()
  @Put('password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async changePassword(
    @Body(validateSchema(changePasswordSchema)) dto: ChangePasswordRequestDto,
    @Req() req: ApplicationRequest,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ChangePasswordResponseDto> {
    const { accessToken, refreshToken } = await this.authService.changePassword(
      req.user,
      dto,
    );
    setRefreshTokenCookie(refreshToken, res);
    return { accessToken };
  }

  @Post('logout')
  async logOut(
    @Res({ passthrough: true }) res: Response,
    @Req() req: ApplicationRequest,
  ) {
    const refreshToken = extractRefreshTokenFromCookies(req);

    if (refreshToken) {
      await this.authService.deleteRefreshToken(req.user, refreshToken);
    }

    req.logout(() => clearRefreshTokenCookie(res));
  }

  @Public()
  @Post('refresh')
  async refresh(@Req() req: ApplicationRequest): Promise<RefreshTokenResponseDto> {
    const refreshToken = extractRefreshTokenFromCookies(req);
    const accessToken = await this.authService.generateNewAccessToken(refreshToken);
    return { accessToken };
  }
}
