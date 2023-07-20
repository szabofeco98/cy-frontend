import { Route } from '@angular/router';
import { authenticationGuard } from './guards/authentication.guard';
import { Routes } from './enums/router.enum';

export const routes: Route[] = [
  {
    path: Routes.WELCOME,
    loadComponent: () =>
      import('./pages/welcome-page/welcome-page.component').then(
        (mod) => mod.WelcomePageComponent
      ),
  },
  {
    path: Routes.HOME,
    loadComponent: () =>
      import('./pages/home-page/home-page.component').then(
        (mod) => mod.HomePageComponent
      ),
    canActivate: [authenticationGuard()],
  },
  {
    path: '**',
    redirectTo: 'welcome',
  },
];
