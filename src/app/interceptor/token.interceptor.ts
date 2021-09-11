import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    let currentUser = JSON.parse(sessionStorage.getItem(environment.TempStorage));
    if (currentUser && currentUser.authToken) {
        request = request.clone({
            setHeaders: {
              Authkey: `test-angular-2021`,
            }
        });
    }
   return next.handle(request);
}
}
