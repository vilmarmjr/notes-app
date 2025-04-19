import { AuthErrors, ChangePasswordRequestDto, SignUpRequestDto } from '@common/models';
import { Injectable } from '@nestjs/common';
import { ApplicationException, SignInMethod, SignInMethods, User } from '@server/shared';
import { UsersService } from '@server/users';
import { compare, hash } from 'bcrypt';
import { HASH_SALT } from '../constants/hash.constants';
import { JwtPayload } from '../types/jwt-payload.type';
import { generateRandomPassword } from '../utils/password.util';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tokenService: TokenService,
  ) {}

  async signUp(dto: SignUpRequestDto) {
    const alreadyExists = await this.usersService.existsByEmail(dto.email);

    if (alreadyExists) {
      throw new ApplicationException(AuthErrors.EMAIL_IS_ALREADY_TAKEN);
    }

    const password = await hash(dto.password, HASH_SALT);
    const user = await this.usersService.save({
      email: dto.email,
      password,
      signInMethod: SignInMethods.EMAIL_AND_PASSWORD,
    });
    const { accessToken, refreshToken } = await this.signIn(user.id, user.password);
    return { accessToken, refreshToken };
  }

  async signIn(userId: string, email: string, withOneTimeToken = false) {
    const payload: JwtPayload = { sub: userId, email: email };
    const [accessToken, refreshToken] = await Promise.all([
      this.tokenService.generateAccessToken(payload),
      this.tokenService.generateRefreshToken(payload),
    ]);
    const oneTimeToken = withOneTimeToken
      ? await this.tokenService.generateOneTimeToken(userId)
      : undefined;
    await this.tokenService.saveRefreshToken(userId, refreshToken, oneTimeToken);
    return { accessToken, refreshToken, oneTimeToken };
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
    if (user.signInMethod !== SignInMethods.EMAIL_AND_PASSWORD) {
      throw new ApplicationException(AuthErrors.SIGN_IN_METHOD_NOT_ALLOWED);
    }

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
    await this.tokenService.deleteUserTokens(user);
    return this.signIn(id, email);
  }

  async findOrCreateUser(email: string, signInMethod: SignInMethod) {
    const user = await this.usersService.findByEmail(email);

    if (user && user.signInMethod !== signInMethod) {
      throw new ApplicationException(
        AuthErrors.EMAIL_IS_BEING_USED_WITH_ANOTHER_SIGN_IN_METHOD,
      );
    }

    if (user) {
      return user;
    }

    const randomPassword = generateRandomPassword();
    const hashedPassword = await hash(randomPassword, HASH_SALT);

    return await this.usersService.save({
      email,
      password: hashedPassword,
      signInMethod,
    });
  }

  async authorize(oneTimeToken: string) {
    const entity = await this.tokenService.findByOneTimeToken(oneTimeToken);

    if (!entity || !this.tokenService.verifyToken(entity.token)) {
      throw new ApplicationException(AuthErrors.UNAUTHORIZED);
    }

    await this.tokenService.deleteOneTimeToken(entity.id);
    const accessToken = await this.tokenService.generateNewAccessToken(entity.token);

    return { refreshToken: entity.token, accessToken };
  }
}
