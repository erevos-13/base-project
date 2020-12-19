
import { ActionReducerMap } from '@ngrx/store';
import * as fromPost from './posts';
import * as fromAuth from './user';

export interface AppState {
  posts: fromPost.PostState;
  auth: fromAuth.UserState

};

export const appReducer: ActionReducerMap<AppState> = {
  posts: fromPost.postReducer,
  auth: fromAuth.authReducer

}
export const effects = [
  fromPost.PostEffect,
  fromAuth.AuthEffect
];
