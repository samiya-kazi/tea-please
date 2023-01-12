import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiInceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokenStr = localStorage.getItem('accessToken');
    if (tokenStr) {
      const token = JSON.parse(tokenStr);
      const reqWithToken = req.clone({setHeaders: {'Authorization': token}});
      return next.handle(reqWithToken);
    }
    return next.handle(req);
  }
}
