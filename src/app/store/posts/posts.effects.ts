import { PostService } from '@app/services/post.service';
import { Injectable } from "@angular/core";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from "rxjs";
import { Router } from "@angular/router";
import * as fromPostAction from "./posts.actions";

@Injectable()
export class PostEffect {
  constructor(
    private actions$: Actions,
    private router: Router,
    private postSrv: PostService
  ) { }


  loadPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPostAction.postStart),
      switchMap((postInput: { start: number, limit: number }) => this.postSrv.getPostsAll(postInput.start, postInput.limit)),
      map((resp) => {
        return fromPostAction.postSuccess({ posts: resp });
      }),
      catchError((err) => {
        return of(fromPostAction.postFail({ error: err }));
      })
    )
  )

}
