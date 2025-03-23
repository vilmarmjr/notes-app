import { DATE_PIPE_DEFAULT_OPTIONS, DatePipeConfig } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, TitleStrategy, withViewTransitions } from '@angular/router';
import {
  apiInterceptor,
  errorInterceptor,
  NotesTitleStrategy,
  withCredentialsInterceptor,
} from '@web/core';
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
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: {
        dateFormat: 'd MMM y',
      } satisfies DatePipeConfig,
    },
    {
      provide: TitleStrategy,
      useClass: NotesTitleStrategy,
    },
  ],
};
