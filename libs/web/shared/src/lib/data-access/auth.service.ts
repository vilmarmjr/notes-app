import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  ChangePasswordRequestDto,
  LogInRequestDto,
  LogInResponseDto,
  RefreshTokenResponseDto,
  SignUpRequestDto,
  SignUpResponseDto,
} from '@common/models';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  logIn(dto: LogInRequestDto) {
    return this.http.post<LogInResponseDto>('auth/login', dto, { withCredentials: true });
  }

  logInWithGoogle() {
    window.location.href = `${environment.apiUrl}/auth/google`;
  }

  logOut() {
    return this.http.post<void>('auth/logout', null, { withCredentials: true });
  }

  signUp(dto: SignUpRequestDto) {
    return this.http.post<SignUpResponseDto>('auth/signup', dto, {
      withCredentials: true,
    });
  }

  changePassword(dto: ChangePasswordRequestDto) {
    return this.http.put<void>('auth/password', dto, { withCredentials: true });
  }

  refreshToken() {
    return this.http.post<RefreshTokenResponseDto>('auth/refresh', null, {
      withCredentials: true,
    });
  }
}
