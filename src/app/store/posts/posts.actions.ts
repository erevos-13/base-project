import { IPosts } from './../../models/backend/Posts';
import { createAction, props } from "@ngrx/store";

export enum PostAction {
  POST_START = '[POST_START] post Start',
  POST_SUCCESS = '[POST_SUCCESS] Post Success',
  POST_FAIL = '[POST_FAIL] Post Fail'
}




export const postStart = createAction(PostAction.POST_START, props<{ start: number, limit: number }>());
export const postSuccess = createAction(PostAction.POST_SUCCESS, props<{ posts: IPosts[] }>());
export const postFail = createAction(PostAction.POST_FAIL, props<{ error: any }>());





