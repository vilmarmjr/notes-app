import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  ChangePasswordRequestDto,
  LogInRequestDto,
  LogInResponseDto,
  SignUpRequestDto,
  SignUpResponseDto,
} from '@common/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  logIn(dto: LogInRequestDto) {
    return this.http.post<LogInResponseDto>('login', dto);
  }

  logOut() {
    return this.http.post<void>('logout', null);
  }

  signUp(dto: SignUpRequestDto) {
    return this.http.post<SignUpResponseDto>('signup', dto);
  }

  changePassword(dto: ChangePasswordRequestDto) {
    return this.http.put<void>('change-password', dto);
  }
}
