import {
  ChangePasswordRequestDto,
  changePasswordSchema,
  LogInResponseDto,
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
import { ApplicationRequest, Public } from '@server/shared/http';
import { validateSchema } from '@server/shared/validation';
import { Request, Response } from 'express';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';
import { clearTokenCookie, setTokenCookie } from '../utils/response.util';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async logIn(
    @Req() req: ApplicationRequest,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LogInResponseDto> {
    const token = await this.authService.signIn(req.user.id, req.user.email);
    setTokenCookie(token, res);
    return { id: req.user.id, email: req.user.email };
  }

  @Public()
  @Post('signup')
  async signUp(
    @Body(validateSchema(signUpRequestSchema)) dto: SignUpRequestDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<SignUpResponseDto> {
    const { id, email, token } = await this.authService.signUp(dto);
    setTokenCookie(token, res);
    return { id, email };
  }

  @Put('change-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async changePassword(
    @Body(validateSchema(changePasswordSchema)) dto: ChangePasswordRequestDto,
    @Req() req: ApplicationRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.changePassword(req.user, dto);
    setTokenCookie(token, res);
  }

  @Post('logout')
  async logOut(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    req.logout(() => clearTokenCookie(res));
  }
}
