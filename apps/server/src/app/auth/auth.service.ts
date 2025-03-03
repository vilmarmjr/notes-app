import { AuthErrors } from '@common/constants';
import { SignUpRequestDto } from '@common/models';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { ApplicationException } from '../core/validation/application.exception';
import { UserService } from '../user/user.service';
import { JwtPayload } from './jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: SignUpRequestDto) {
    const alreadyExists = await this.userService.existsByEmail(dto.email);

    if (alreadyExists) {
      throw new ApplicationException(AuthErrors.EMAIL_IS_ALREADY_TAKEN);
    }

    const password = await hash(dto.password, 10);
    const user = await this.userService.save(dto.email, password);
    const token = await this.signIn(user.id, user.password);
    return { id: user.id, email: user.email, token };
  }

  async signIn(id: string, email: string) {
    const payload: JwtPayload = { sub: id, email: email };
    const token = await this.jwtService.signAsync(payload);
    return token;
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await compare(password, user.password);

    return isPasswordValid ? user : null;
  }
}
