import { HttpParams } from '@angular/common/http';

export function buildHttpParams<T extends object>(params: T) {
  let httpParams = new HttpParams();
  const entries = Object.entries(params);

  for (const [key, value] of entries) {
    if (value !== null && value !== undefined && value !== '') {
      httpParams = httpParams.append(key, value);
    }
  }

  return httpParams;
}
