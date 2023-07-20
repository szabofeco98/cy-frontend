import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginResponse, User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private httpClient = inject(HttpClient);

  private _loggedInUser = new BehaviorSubject<LoginResponse['result'] | null>(
    null
  );

  public get loggedInUser() {
    return this._loggedInUser.asObservable();
  }

  public login({ email, password }: User): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginResponse>('authenticate', { data: { email, password } })
      .pipe(tap((value) => this._loggedInUser.next(value.result)));
  }
}
