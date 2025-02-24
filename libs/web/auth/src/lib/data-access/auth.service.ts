import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  LogInRequestDto,
  LogInResponseDto,
  SignUpRequestDto,
  SignUpResponseDto,
} from '@common/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _http = inject(HttpClient);

  logIn(dto: LogInRequestDto) {
    return this._http.post<LogInResponseDto>('login', dto);
  }

  signUp(dto: SignUpRequestDto) {
    return this._http.post<SignUpResponseDto>('signup', dto);
  }
}
