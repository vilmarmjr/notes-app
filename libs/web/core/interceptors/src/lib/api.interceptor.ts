import { HttpInterceptorFn } from '@angular/common/http';

export function apiInterceptor(apiUrl: string): HttpInterceptorFn {
  return (req, next) => next(req.clone({ url: `${apiUrl}/${req.url}` }));
}
