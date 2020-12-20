import { AppState } from '@app/store';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as fromAuth from '@app/store/user';
import { map, take, tap } from 'rxjs/operators';
import { Settings } from '@app/shared/settings';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) {

  }

  private check(): Observable<boolean> {
    return this.store.pipe(select(fromAuth.getAuth)).pipe(
      take(1),
      map(auth => {
        const rememberMe_ = localStorage.getItem(Settings.LocalStorages.rememberMe)
        if (!auth && !rememberMe_) {
          this.router.navigate(['auth']);
          return false;
        }
        return true;
      })
    );
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.check();
  }

}
