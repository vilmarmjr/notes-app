import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { apiInterceptor, withCredentialsInterceptor } from '@web/core/interceptors';
import { environment } from '../environments/environment';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(appRoutes, withViewTransitions({ skipInitialTransition: true })),
    provideHttpClient(
      withInterceptors([apiInterceptor(environment.apiUrl), withCredentialsInterceptor]),
    ),
  ],
};
