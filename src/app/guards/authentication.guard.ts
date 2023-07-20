import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Routes } from '../enums/router.enum';

export function authenticationGuard(): CanActivateFn {
  return () => {
    if (toSignal(inject(AuthenticationService).loggedInUser)()?.id) {
      return true;
    } else {
      inject(Router).navigate([Routes.WELCOME]);
      return false;
    }
  };
}
