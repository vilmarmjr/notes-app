import { AuthErrors } from '@common/models';
import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationException, User } from '@server/shared';
import { Repository } from 'typeorm';
import {
  ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION,
} from '../constants/token.constants';
import { RefreshToken } from '../entities/refresh-token.entity';
import { JwtPayload } from '../types/jwt-payload.type';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  deleteUserTokens(user: User) {
    return this.refreshTokenRepository
      .createQueryBuilder()
      .delete()
      .where('user_id = :id', { id: user.id })
      .execute();
  }

  async signIn(payload: JwtPayload) {
    const { accessToken, refreshToken } = await Promise.all([
      this.jwtService.signAsync(payload, { expiresIn: ACCESS_TOKEN_EXPIRATION }),
      this.jwtService.signAsync(payload, { expiresIn: REFRESH_TOKEN_EXPIRATION }),
    ]).then(([accessToken, refreshToken]) => ({ accessToken, refreshToken }));
    await this.refreshTokenRepository.save({
      token: refreshToken,
      user: { id: payload.sub },
    });
    return { accessToken, refreshToken };
  }

  generateTokens(payload: JwtPayload) {
    return Promise.all([
      this.jwtService.signAsync(payload, { expiresIn: ACCESS_TOKEN_EXPIRATION }),
      this.jwtService.signAsync(payload, { expiresIn: REFRESH_TOKEN_EXPIRATION }),
    ]).then(([accessToken, refreshToken]) => ({ accessToken, refreshToken }));
  }

  saveRefreshToken(userId: string, refreshToken: string) {
    return this.refreshTokenRepository.save({
      token: refreshToken,
      user: { id: userId },
    });
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
