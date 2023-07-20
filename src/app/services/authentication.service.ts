import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, filter, tap } from 'rxjs';
import { LoginResponse, User } from '../interfaces/user';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private localStorageService = inject(LocalStorageService);

  private httpClient = inject(HttpClient);

  private _loggedInUser = new BehaviorSubject<LoginResponse['result'] | null>(
    null
  );

  public get loggedInUser() {
    return this._loggedInUser.asObservable();
  }

  public login({
    email,
    password,
    rememberMe,
  }: User): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginResponse>('authenticate', { data: { email, password } })
      .pipe(
        tap((value) => this._loggedInUser.next(value.result)),
        filter((value) => !!value.result.id && !!rememberMe),
        tap(() => {
          this.localStorageService.removeItem('cy-user');
          this.localStorageService.setItem('cy-user', { email, password });
        })
      );
  }

  public logOut(): void {
    this._loggedInUser.next(null);
    this.localStorageService.removeItem('cy-user');
  }
}
