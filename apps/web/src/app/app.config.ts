import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withViewTransitions } from '@angular/router';
import {
  apiInterceptor,
  errorInterceptor,
  withCredentialsInterceptor,
} from '@web/core/interceptors';
import { environment } from '../environments/environment';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(appRoutes, withViewTransitions({ skipInitialTransition: true })),
    provideHttpClient(
      withInterceptors([
        apiInterceptor(environment.apiUrl),
        withCredentialsInterceptor,
        errorInterceptor,
      ]),
    ),
    provideAnimations(),
  ],
};
