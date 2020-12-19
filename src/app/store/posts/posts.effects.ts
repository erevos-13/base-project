import { IPostInput } from './../../services/api/postsApi';
import { PostService } from '@app/services/post.service';
import { Injectable } from "@angular/core";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { switchMap, catchError, map, tap, mergeMap, concatAll, concatMap } from 'rxjs/operators';
import { of } from "rxjs";
import { Router } from "@angular/router";
import * as fromPostAction from "./posts.actions";
import * as _ from 'lodash';

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

  addPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPostAction.postAddStart),
      switchMap((postAdded: { post: IPostInput }) => this.postSrv.addInPost(postAdded.post)),
      switchMap((addPost) => {
        return this.postSrv.getPostsAll(0, 5).pipe(
          map((res) => {
            return  _.orderBy([addPost, ...res], ['id'], ['asc']);
          })
        );
      }),
      map((resp) => {
        return fromPostAction.postSuccess({ posts: resp });
      }),
      catchError((err) => {
        return of(fromPostAction.postFail({ error: err }))
      })
    )
  )

  removePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPostAction.postRemoveStart),
      switchMap((postId: { postId: number }) => this.postSrv.removePostById(postId.postId).pipe(
        map(() => postId.postId)
      )),
      switchMap((removeId) => this.postSrv.getPostsAll(0, 5).pipe(
        map(res => {
          const body_ = _.remove(res, (i_) => {
            return i_.id !== removeId;
          })
          return body_;
        })
      )),
      map((resp) => {
        return fromPostAction.postSuccess({ posts: resp });
      }),
      catchError((err) => {
        return of(fromPostAction.postFail({ error: err }))
      })
    )
  )


  editPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPostAction.postEditStart),
      switchMap((post: {post: IPostInput}) => this.postSrv.editPost(post.post)),
      switchMap((editPost) => {
        return this.postSrv.getPostsAll(0, 5).pipe(
          map((res) => {
            const body_ = _.remove(res, (i_) => {
              return i_.id !== editPost.id;
            })
            return _.orderBy([editPost, ...body_], ['id'], ['asc']);
          })
        );
      }),
      map((resp) => {
        return fromPostAction.postSuccess({ posts: resp });
      }),
      catchError((err) => {
        return of(fromPostAction.postFail({ error: err }))
      })
    )
  )

}
