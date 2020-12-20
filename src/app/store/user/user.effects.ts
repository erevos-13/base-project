import { IPostInput } from './../../services/api/postsApi';
import { PostService } from '@app/services/post.service';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { of } from "rxjs";
import { Router } from "@angular/router";
import { uuid } from 'uuidv4';
import * as fromAuthAction from './user.actions';
import { Settings } from '@app/shared/settings';

@Injectable()
export class AuthEffect {
  constructor(
    private actions$: Actions,
    private router: Router,
    private postSrv: PostService
  ) { }


  authLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthAction.authStart),
      exhaustMap((input) => {
        if(input.rememberMe) {
          localStorage.setItem(Settings.LocalStorages.rememberMe, 'true');
        }

        return of(fromAuthAction.authSuccess({ auth: 'sdfsfsdfdsfdsfd' }))
      }),
      catchError((err) => {
        console.error(err);
        return of(fromAuthAction.authFail({ error: err }));
      })
    )
  )

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthAction.authSuccess),
      tap((uid) => {
        this.router.navigate(['home']);
      })
    ), { dispatch: false }
  )

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthAction.authLogout),
      tap((uid) => {
        localStorage.clear();
        this.router.navigate(['auth'], {replaceUrl: true});
      })
    ), { dispatch: false }
  )

}

