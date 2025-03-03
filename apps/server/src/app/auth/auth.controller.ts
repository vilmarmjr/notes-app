import {
  logInRequestSchema,
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
  Req,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApplicationRequest } from '../core/types/application-request.type';
import { clearTokenCookie, setTokenCookie } from '../core/utils/response';
import { validateSchema } from '../core/validation/validation.pipe';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from './public.strategy';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UsePipes(validateSchema(logInRequestSchema))
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

  @UsePipes(validateSchema(signUpRequestSchema))
  @Public()
  @Post('signup')
  async signUp(
    @Body() dto: SignUpRequestDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<SignUpResponseDto> {
    const { id, email, token } = await this.authService.signUp(dto);
    setTokenCookie(token, res);
    return { id, email };
  }

  @Post('logout')
  async logOut(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    req.logout(() => clearTokenCookie(res));
  }
}
