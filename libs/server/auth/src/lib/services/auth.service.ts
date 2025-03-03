import { AuthErrors } from '@common/constants';
import { SignUpRequestDto } from '@common/models';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApplicationException, UsersService } from '@server/core';
import { compare, hash } from 'bcrypt';
import { JwtPayload } from '../types/jwt-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: SignUpRequestDto) {
    const alreadyExists = await this.usersService.existsByEmail(dto.email);

    if (alreadyExists) {
      throw new ApplicationException(AuthErrors.EMAIL_IS_ALREADY_TAKEN);
    }

    const password = await hash(dto.password, 10);
    const user = await this.usersService.save(dto.email, password);
    const token = await this.signIn(user.id, user.password);
    return { id: user.id, email: user.email, token };
  }

  async signIn(id: string, email: string) {
    const payload: JwtPayload = { sub: id, email: email };
    const token = await this.jwtService.signAsync(payload);
    return token;
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await compare(password, user.password);

    return isPasswordValid ? user : null;
  }
}
