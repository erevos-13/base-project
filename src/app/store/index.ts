
import { ActionReducerMap } from '@ngrx/store';
import * as fromPost from './posts';

export interface AppState {
  posts: fromPost.PostState;

};

export const appReducer: ActionReducerMap<AppState> = {
  posts: fromPost.postReducer,

}
export const effects = [
  fromPost.PostEffect
];
