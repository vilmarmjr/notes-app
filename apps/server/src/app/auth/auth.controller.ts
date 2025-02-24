import {
  LoginRequestDto,
  loginRequestSchema,
  SignupRequestDto,
  signupRequestSchema,
} from '@common/models';
import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes } from '@nestjs/common';
import { validateSchema } from '../core/validation/validation.pipe';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UsePipes(validateSchema(loginRequestSchema))
  @Post('login')
  login(@Body() dto: LoginRequestDto) {
    return this.authService.login(dto);
  }

  @Post('signup')
  @UsePipes(validateSchema(signupRequestSchema))
  register(@Body() dto: SignupRequestDto) {
    return this.authService.signup(dto);
  }
}
