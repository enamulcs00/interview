import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toaster: ToastrService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap((data: any) => {
              console.log('Err interceptor called',data,'msg',data.body?.message);
              
                if (data.body && data.body.status == false) {
                    this.toaster.error( 'Something went wrong', "Error!");
                    return Observable.throw(data.body);
                } else {
                    return data.body;
                }
            }),
            catchError(err => {
                if (err.status === 401) {
                    this.toaster.error("Not authorized", "Error!");
                    sessionStorage.removeItem(environment.TempStorage);
                    this.router.navigate(['/login']);
                }
                else {
                    var error = err.error || err.statusText || err.message;
                    this.toaster.error(error, "Error!")
                }
                var error =  err.error || err.statusText || err.message;
                return throwError(error);
            }));
    }
}
