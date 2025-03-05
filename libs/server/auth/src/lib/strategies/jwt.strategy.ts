import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UsersService } from '@server/users';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_SECRET } from '../constants/jwt.constants';
import { JwtPayload } from '../types/jwt-payload.type';
import { extractTokenFromCookies } from '../utils/request.util';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private _userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([extractTokenFromCookies]),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this._userService.findById(payload.sub);
    return user;
  }
}
