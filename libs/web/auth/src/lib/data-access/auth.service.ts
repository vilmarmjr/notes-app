import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  LoginRequestDto,
  LoginResponseDto,
  SignupRequestDto,
  SignupResponseDto,
} from '@common/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _http = inject(HttpClient);

  login(dto: LoginRequestDto) {
    return this._http.post<LoginResponseDto>('login', dto);
  }

  signup(dto: SignupRequestDto) {
    return this._http.post<SignupResponseDto>('signup', dto);
  }
}
