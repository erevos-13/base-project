import { IPosts } from './../../models/backend/Posts';
import { createAction, props } from "@ngrx/store";
import { IPostInput } from '@app/services/api';

export enum PostAction {
  POST_START = '[POST_START] post Start',
  POST_SUCCESS = '[POST_SUCCESS] Post Success',
  POST_FAIL = '[POST_FAIL] Post Fail',

  POST_ADD_START = "[POST_ADD_START] post add",
  POST_ADD_SUCCESS = "[POST_ADD_SUCCESS] post success",
  POST_ADD_FAIL = "[POST_ADD_FAIL] post add fail",

  POST_REMOVE_START = "[POST_REMOVE_START]",
  POST_REMOVE_SUCCESS = "[POST_REMOVE_SUCCESS]",
  POST_REMOVE_FAIL = "[POST_REMOVE_FAIL]",


  POST_EDIT_START = "[POST_EDIT_START]",
  POST_EDIT_SUCCESS = "[POST_EDIT_SUCCESS]",
  POST_EDIT_FAIL = "[POST_EDIT_FAIL]",
}




export const postStart = createAction(PostAction.POST_START, props<{ start: number, limit: number }>());
export const postSuccess = createAction(PostAction.POST_SUCCESS, props<{ posts: IPosts[] }>());
export const postFail = createAction(PostAction.POST_FAIL, props<{ error: any }>());

export const postAddStart = createAction(PostAction.POST_ADD_START, props<{ post: IPostInput }>());
export const postAddSuccess = createAction(PostAction.POST_ADD_SUCCESS, props<{ posts: IPosts[] }>());
export const postAddFail = createAction(PostAction.POST_ADD_FAIL, props<{ error: any }>());


export const postRemoveStart = createAction(PostAction.POST_REMOVE_START, props<{ postId: number }>());
export const postRemoveSuccess = createAction(PostAction.POST_REMOVE_SUCCESS, props<{ posts: IPosts[] }>());
export const postRemoveFail = createAction(PostAction.POST_REMOVE_FAIL, props<{ error: any }>());


export const postEditStart = createAction(PostAction.POST_EDIT_START, props<{ post: IPostInput }>());
export const postEditSuccess = createAction(PostAction.POST_EDIT_SUCCESS, props<{ posts: IPosts[] }>());
export const postEditFail = createAction(PostAction.POST_EDIT_FAIL, props<{ error: any }>());





