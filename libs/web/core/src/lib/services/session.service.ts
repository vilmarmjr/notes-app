import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private accessToken: string | null = null;

  getAccessToken() {
    return this.accessToken;
  }

  hasAccessToken() {
    return !!this.accessToken;
  }

  setAccessToken(value: string) {
    this.accessToken = value;
  }

  clearAccessToken() {
    this.accessToken = null;
  }
}
