import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { ApplicationException } from '../core/validation/application.exception';
import { AuthError } from '../core/validation/errors';
import { LoginDto, LoginResponseDto } from './login.dto';
import { SignupDto, SignupResponseDto } from './signup.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto): Promise<SignupResponseDto> {
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
    const token = await this.jwtService.signAsync({ email: dto.email });
    return { id: user.id, email: user.email, token };
  }

  async login(dto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.userRepository.findOneBy({ email: dto.email });

    if (!user) {
      throw new ApplicationException(AuthError.INCORRECT_EMAIL_OR_PASSWORD);
    }

    const isPasswordValid = await compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new ApplicationException(AuthError.INCORRECT_EMAIL_OR_PASSWORD);
    }

    const token = await this.jwtService.signAsync({ email: user.email });
    return { id: user.id, email: user.email, token };
  }
}
