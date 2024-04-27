import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AreaIdGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean {

      const ids = ['001', '002', '003', '004', '005']
      const isIdSupported = ids.includes(route.params['id'])
  
      if (!isIdSupported) {
        this.router.navigateByUrl('');
        return false;
      }
    return true;
  }
  
}
