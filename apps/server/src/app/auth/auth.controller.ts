import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes } from '@nestjs/common';
import { validateSchema } from '../core/validation/validation.pipe';
import { AuthService } from './auth.service';
import { LoginDto, loginSchema } from './login.dto';
import { SignupDto, signupSchema } from './signup.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UsePipes(validateSchema(loginSchema))
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('signup')
  @UsePipes(validateSchema(signupSchema))
  register(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }
}
