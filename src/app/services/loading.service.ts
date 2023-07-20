import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private _loading = new BehaviorSubject<boolean>(false);

  public get loading() {
    return this._loading.asObservable();
  }

  public startLoading(): void {
    this._loading.next(true);
  }

  public stopLoading(): void {
    this._loading.next(false);
  }
}
