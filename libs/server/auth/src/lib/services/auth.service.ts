import { AuthErrors, ChangePasswordRequestDto, SignUpRequestDto } from '@common/models';
import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationException, User } from '@server/shared';
import { UsersService } from '@server/users';
import { compare, hash } from 'bcrypt';
import { Repository } from 'typeorm';
import {
  ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION,
} from '../constants/token.constants';
import { RefreshToken } from '../entities/refresh-token.entity';
import { JwtPayload } from '../types/jwt-payload.type';

const HASH_SALT = 10;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  async signUp(dto: SignUpRequestDto) {
    const alreadyExists = await this.usersService.existsByEmail(dto.email);

    if (alreadyExists) {
      throw new ApplicationException(AuthErrors.EMAIL_IS_ALREADY_TAKEN);
    }

    const password = await hash(dto.password, HASH_SALT);
    const user = await this.usersService.save({ email: dto.email, password });
    const { accessToken, refreshToken } = await this.signIn(user.id, user.password);
    return { accessToken, refreshToken };
  }

  async signIn(id: string, email: string) {
    const payload: JwtPayload = { sub: id, email: email };
    const { accessToken, refreshToken } = await Promise.all([
      this.jwtService.signAsync(payload, { expiresIn: ACCESS_TOKEN_EXPIRATION }),
      this.jwtService.signAsync(payload, { expiresIn: REFRESH_TOKEN_EXPIRATION }),
    ]).then(([accessToken, refreshToken]) => ({ accessToken, refreshToken }));
    await this.refreshTokenRepository.save({ token: refreshToken, user: { id } });
    return { accessToken, refreshToken };
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await compare(password, user.password);

    return isPasswordValid ? user : null;
  }

  async changePassword(user: User, dto: ChangePasswordRequestDto) {
    const { oldPassword, newPassword } = dto;

    if (oldPassword === newPassword) {
      throw new ApplicationException(AuthErrors.OLD_AND_NEW_PASSWORD_MUST_BE_DIFFERENT);
    }

    const isOldPasswordValid = await compare(oldPassword, user.password);

    if (!isOldPasswordValid) {
      throw new ApplicationException(AuthErrors.INVALID_OLD_PASSWORD);
    }

    const password = await hash(newPassword, HASH_SALT);
    const { id, email } = await this.usersService.save({ id: user.id, password });
    await this.refreshTokenRepository
      .createQueryBuilder()
      .delete()
      .where('user_id = :id', { id: user.id })
      .execute();
    return this.signIn(id, email);
  }

  async generateNewAccessToken(refreshToken: string | null) {
    if (!refreshToken) {
      throw new ApplicationException(AuthErrors.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    const decoded = this.jwtService.decode<JwtPayload>(refreshToken);

    if (!decoded) {
      throw new ApplicationException(AuthErrors.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    const tokenExists = await this.refreshTokenRepository.existsBy({
      token: refreshToken,
      user: { id: decoded.sub },
    });

    if (!tokenExists) {
      throw new ApplicationException(AuthErrors.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    const payload: JwtPayload = { email: decoded.email, sub: decoded.sub };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: ACCESS_TOKEN_EXPIRATION,
    });
    return accessToken;
  }

  async deleteRefreshToken(user: User, token: string) {
    const refreshToken = await this.refreshTokenRepository.findOne({
      where: { token, user: { id: user.id } },
    });

    if (refreshToken) {
      await this.refreshTokenRepository.delete(refreshToken.id);
    }
  }
}
