import { AppState } from '@app/store';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as fromAuth from '@app/store/user';
import { map, take, tap } from 'rxjs/operators';

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
        tap(auth => {
            if (!auth) {
                this.router.navigate(['auth']);
            }
        }),
        map(auth => !!auth)
    );
}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.check();
  }

}
