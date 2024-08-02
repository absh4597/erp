import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, map, catchError } from 'rxjs/operators';
import { AuthService } from '../components/auth/auth.service';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(private _authService: AuthService) { }

  // intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  //   return next.handle(req).pipe(
  //     retry(3),
  //     map(res => {
  //       if (res instanceof HttpResponse) {
  //         return res;
  //       }
  //       return null;
  //     }),
  //     catchError((err: HttpErrorResponse) => {
  //       let errMsg = "";
  //       if (err.error instanceof ErrorEvent) { // Client-side error
  //         errMsg = `Error : ${err.message}`;
  //       } else { // Server-side error
  //         errMsg = `Error Message : ${err.message} Error Status : ${err.status}`;
  //       }

  //       return throwError(() => Error(errMsg));
  //     })
  //   )
  // }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Add JWT token to headers if available
    const token = this._authService.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
}
}