import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      let loginInfo = JSON.parse(sessionStorage.getItem(environment.TempStorage));
      if(loginInfo && loginInfo.authToken) {
          return true;
      } else {
          this.router.navigate(['/login']);
         
      }
  }
  
}
