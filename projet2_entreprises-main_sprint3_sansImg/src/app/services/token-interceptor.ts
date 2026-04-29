import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from './auth';

const EXCLUDE_URLS = [
  '/login',
  '/register',
  '/verifyEmail',
  '/api/image', // ✅ exclure toutes les routes image
];

function toExclude(url: string): boolean {
  return EXCLUDE_URLS.some((excluded) => url.includes(excluded));
}

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Auth);

  if (!toExclude(req.url)) {
    const jwt = authService.getToken();
    if (jwt) {
      const reqWithToken = req.clone({
        setHeaders: { Authorization: 'Bearer ' + jwt },
      });
      return next(reqWithToken);
    }
  }
  return next(req);
};
