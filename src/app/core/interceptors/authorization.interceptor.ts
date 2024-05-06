import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      req.url.includes('auth/login') ||
      (req.url.includes('auth') && req.method == 'POST')
    ) {
      return next.handle(req).pipe(finalize(() => {}));
    }

    const token = localStorage.getItem('token') ?? '';

    if (token) {
      req = req.clone({
        setHeaders: {
          authorization: `${token}`,
        },
      });
    }

    return next.handle(req).pipe(
      finalize(() => {}),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          console.error('AuthInterceptor: Error 401');
          this.router.navigateByUrl('/auth/login');
        }
        return throwError(() => new Error(err.message));
      })
    );
  }
}
