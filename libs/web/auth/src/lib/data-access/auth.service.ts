import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginDto, LoginResponseDto, SignupDto, SignupResponseDto } from '@common/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _http = inject(HttpClient);

  login(dto: LoginDto) {
    return this._http.post<LoginResponseDto>('login', dto);
  }

  signup(dto: SignupDto) {
    return this._http.post<SignupResponseDto>('signup', dto);
  }
}
