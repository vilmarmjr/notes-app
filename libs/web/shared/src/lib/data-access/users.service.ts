import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GetMeResponse } from '@common/models';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private http = inject(HttpClient);

  getMe() {
    return this.http.get<GetMeResponse>('users/me');
  }
}
