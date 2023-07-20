import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { LoadingService } from '../services/loading.service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';

export function baseInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  if (!req.url.includes('assets')) {
    const loadingService = inject(LoadingService);
    loadingService.startLoading();
    const clonedRequest = req.clone({
      url: `${environment.baseUrl}/${req.url}`,
    });
    return next(clonedRequest).pipe(
      finalize(() => loadingService.stopLoading())
    );
  } else {
    return next(req);
  }
}
