import { APP_INITIALIZER, EnvironmentProviders, inject, InjectionToken, makeEnvironmentProviders, signal, WritableSignal } from "@angular/core";
import { ConfigState, initialConfigState } from "./config.model";
import { HttpClient } from "@angular/common/http";
import { delay, tap } from "rxjs";


export const CONFIG_STATE = new InjectionToken<WritableSignal<ConfigState>>('CONFIG_STATE', {
  providedIn: 'root',
  factory: () => signal(initialConfigState)
});

export function provideConfigState(url: string): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (
        http = inject(HttpClient),
        configState = inject(CONFIG_STATE)
      ) => () => http.get<ConfigState>(url).pipe(
        tap(config => configState.set(config))
      )
    }
  ]);
}

export function injectUsername(): string {
  return inject(CONFIG_STATE)().userInfo.username;
}
