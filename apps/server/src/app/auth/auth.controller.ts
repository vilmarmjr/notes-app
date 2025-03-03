import {
  LogInRequestDto,
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
  Res,
  UsePipes,
} from '@nestjs/common';
import { Response } from 'express';
import { clearTokenCookie, setTokenCookie } from '../core/validation/utils/response';
import { validateSchema } from '../core/validation/validation.pipe';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UsePipes(validateSchema(logInRequestSchema))
  @Post('login')
  async logIn(
    @Body() dto: LogInRequestDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LogInResponseDto> {
    const { id, email, token } = await this.authService.logIn(dto);
    setTokenCookie(token, res);
    return { id, email };
  }

  @Post('signup')
  @UsePipes(validateSchema(signUpRequestSchema))
  async signUp(
    @Body() dto: SignUpRequestDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<SignUpResponseDto> {
    const { id, email, token } = await this.authService.signUp(dto);
    setTokenCookie(token, res);
    return { id, email };
  }

  @Post('logout')
  async logOut(@Res({ passthrough: true }) res: Response) {
    clearTokenCookie(res);
  }
}
