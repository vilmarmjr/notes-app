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
  CustomTitleStrategy,
  errorInterceptor,
  tokenInterceptor,
} from '@web/core';
import { environment } from '@web/shared';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(appRoutes, withViewTransitions({ skipInitialTransition: true })),
    provideHttpClient(
      withInterceptors([
        apiInterceptor(environment.apiUrl),
        tokenInterceptor,
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
      useClass: CustomTitleStrategy,
    },
  ],
};
