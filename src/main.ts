import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { baseInterceptor } from './app/interceptors/base.interceptor';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AuthenticationService } from './app/services/authentication.service';
import { User } from './app/interfaces/user';
import { LocalStorageService } from './app/services/local-storage.service';
import { of } from 'rxjs';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, '/assets/i18n/', '.json');
}

export const loginInitializer =
  (authService: AuthenticationService, storageService: LocalStorageService) =>
  () => {
    const user = storageService.getItem('cy-user') as Omit<User, 'rememberMe'>;
    if (user) {
      return authService.login({ ...user, rememberMe: true });
    }
    return of(true);
  };

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([baseInterceptor])),
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: loginInitializer,
      deps: [AuthenticationService, LocalStorageService],
      multi: true,
    },
  ],
})
  // eslint-disable-next-line no-console
  .catch((err) => console.error(err));
