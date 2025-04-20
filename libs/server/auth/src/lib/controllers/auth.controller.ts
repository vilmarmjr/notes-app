import {
  AuthorizeRequestDto,
  authorizeRequestSchema,
  AuthorizeResponseDto,
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
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApplicationRequest, env, Public, validateSchema } from '@server/shared';
import { Response } from 'express';
import { Transactional } from 'typeorm-transactional';
import { GoogleAuthGuard } from '../guards/google-auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';
import { SessionService } from '../services/session.service';
import { extractRefreshTokenFromCookies } from '../utils/request.util';
import { clearRefreshTokenCookie, setRefreshTokenCookie } from '../utils/response.util';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private sessionService: SessionService,
  ) {}

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
  @Public()
  @Post('authorize')
  async authorize(
    @Body(validateSchema(authorizeRequestSchema)) dto: AuthorizeRequestDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthorizeResponseDto> {
    const { refreshToken, accessToken } = await this.authService.authorize(
      dto.oneTimeToken,
    );
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
      await this.sessionService.deleteSession(req.user, refreshToken);
    }

    req.logout(() => clearRefreshTokenCookie(res));
  }

  @Public()
  @Post('refresh')
  async refresh(@Req() req: ApplicationRequest): Promise<RefreshTokenResponseDto> {
    const refreshToken = extractRefreshTokenFromCookies(req);
    const accessToken = await this.sessionService.generateNewAccessToken(refreshToken);
    return { accessToken };
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  @Public()
  async googleAuth() {
    // This endpoint initiates the Google OAuth flow
  }

  @Transactional()
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  @Public()
  async googleAuthCallback(
    @Req() req: ApplicationRequest,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    if (!req.user) return;

    const { oneTimeToken } = await this.authService.signIn(
      req.user.id,
      req.user.email,
      true,
    );
    res.redirect(`${env.FRONTEND_URL}/authorize?t=${oneTimeToken}`);
  }
}
