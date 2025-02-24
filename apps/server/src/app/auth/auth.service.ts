import { LogInRequestDto, SignUpRequestDto } from '@common/models';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { ApplicationException } from '../core/validation/application.exception';
import { AuthError } from '../core/validation/errors';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: SignUpRequestDto) {
    const alreadyExists = await this.userRepository.exists({
      where: { email: dto.email },
    });

    if (alreadyExists) {
      throw new ApplicationException(AuthError.EMAIL_ALREADY_TAKEN);
    }

    const password = await hash(dto.password, 10);
    const user = await this.userRepository.save({
      email: dto.email,
      password,
    });
    const token = await this.signIn(user);
    return { id: user.id, email: user.email, token };
  }

  async logIn(dto: LogInRequestDto) {
    const user = await this.userRepository.findOneBy({ email: dto.email });

    if (!user) {
      throw new ApplicationException(AuthError.INCORRECT_EMAIL_OR_PASSWORD);
    }

    const isPasswordValid = await compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new ApplicationException(AuthError.INCORRECT_EMAIL_OR_PASSWORD);
    }

    const token = await this.signIn(user);
    return { id: user.id, email: user.email, token };
  }

  private async signIn(user: User) {
    const token = await this.jwtService.signAsync({ id: user.id });
    return token;
  }
}
