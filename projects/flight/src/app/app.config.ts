import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withDebugTracing, withDisabledInitialNavigation, withPreloading } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { APP_ROUTES } from './app.routes';
import { provideRouterFeature } from './shared/logic-router-state';
import { provideConfigState } from './shared/util-config';
import { authInterceptor } from './shared/logic-communication';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES,
      withComponentInputBinding(),
      // withDebugTracing(),
      // withPreloading(PreloadAllModules),
      // withDisabledInitialNavigation()
    ),
    provideHttpClient(
      // withInterceptors([
      //   authInterceptor
      // ]),
      // withInterceptorsFromDi()
    ),
    provideStore(),
    provideEffects(),
    provideRouterFeature(),
    provideConfigState('./config.state.json')
  ]
};
