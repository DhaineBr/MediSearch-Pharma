import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpBaseInterceptor implements HttpInterceptor {
  withHeaders = ['/me', '/customer/register', '/logout', '/my-profile', '/my-profile/update']
  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (this.withHeaders.some((url) => request.url.includes(url))) {
      const token = localStorage.getItem('authToken');
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }
}
