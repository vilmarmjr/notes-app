import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from '@server/shared';
import { UsersModule } from '@server/users';
import { AuthController } from './controllers/auth.controller';
import { RefreshToken } from './entities/refresh-token.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    TokenService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: env.JWT_SECRET,
    }),
    TypeOrmModule.forFeature([RefreshToken]),
  ],
})
export class AuthModule {}
