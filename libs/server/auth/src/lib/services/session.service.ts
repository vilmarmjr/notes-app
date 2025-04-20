import { AuthErrors } from '@common/models';
import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationException, User } from '@server/shared';
import { Repository } from 'typeorm';
import {
  ACCESS_TOKEN_EXPIRATION,
  ONE_TIME_TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION,
} from '../constants/token.constants';
import { Session } from '../entities/session.entity';
import { JwtPayload } from '../types/jwt-payload.type';

@Injectable()
export class SessionService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
  ) {}

  deleteUserSessions(user: User) {
    return this.sessionRepository
      .createQueryBuilder()
      .delete()
      .where('user_id = :id', { id: user.id })
      .execute();
  }

  async signIn(payload: JwtPayload) {
    const { accessToken, refreshToken } = await Promise.all([
      this.generateAccessToken(payload),
      this.generateRefreshToken(payload),
    ]).then(([accessToken, refreshToken]) => ({ accessToken, refreshToken }));
    await this.sessionRepository.save({
      refreshToken,
      user: { id: payload.sub },
    });
    return { accessToken, refreshToken };
  }

  generateAccessToken(payload: JwtPayload) {
    return this.jwtService.signAsync(payload, { expiresIn: ACCESS_TOKEN_EXPIRATION });
  }

  generateRefreshToken(payload: JwtPayload) {
    return this.jwtService.signAsync(payload, { expiresIn: REFRESH_TOKEN_EXPIRATION });
  }

  generateOneTimeToken(userId: string) {
    return this.jwtService.signAsync(
      { sub: userId },
      { expiresIn: ONE_TIME_TOKEN_EXPIRATION },
    );
  }

  saveSession(userId: string, refreshToken: string, oneTimeToken?: string) {
    return this.sessionRepository.save({
      refreshToken,
      oneTimeToken,
      user: { id: userId },
    });
  }

  async generateNewAccessToken(refreshToken: string | null) {
    if (!refreshToken) {
      throw new ApplicationException(AuthErrors.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    const decoded = this.jwtService.verify<JwtPayload>(refreshToken);

    if (!decoded) {
      throw new ApplicationException(AuthErrors.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    const sessionExists = await this.sessionRepository.existsBy({
      refreshToken,
      user: { id: decoded.sub },
    });

    if (!sessionExists) {
      throw new ApplicationException(AuthErrors.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    const payload: JwtPayload = { email: decoded.email, sub: decoded.sub };
    const accessToken = await this.generateAccessToken(payload);
    return accessToken;
  }

  async deleteSession(user: User, token: string) {
    const session = await this.sessionRepository.findOne({
      where: { refreshToken: token, user: { id: user.id } },
    });

    if (session) {
      await this.sessionRepository.delete(session.id);
    }
  }

  findByOneTimeToken(token: string) {
    return this.sessionRepository.findOne({ where: { oneTimeToken: token } });
  }

  deleteOneTimeToken(id: string) {
    return this.sessionRepository.update(id, { oneTimeToken: null });
  }

  verifyToken(token: string) {
    return this.jwtService.verifyAsync(token);
  }
}
