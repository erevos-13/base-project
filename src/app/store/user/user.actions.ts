import { createAction, props } from "@ngrx/store";

export enum UserAction {
  USER_START = '[USER_START] user Start',
  USER_SUCCESS = '[USER_SUCCESS] user Success',
  USER_FAIL = '[USER_FAIL] user Fail',

  USER_LOGOUT = "[USER_LOGOUT] log out"

};

export const authStart = createAction(UserAction.USER_START, props<{ email: string, password: string, rememberMe: boolean }>());
export const authSuccess = createAction(UserAction.USER_SUCCESS, props<{ auth: any }>());
export const authFail = createAction(UserAction.USER_FAIL, props<{ error: any }>());
export const authLogout = createAction(UserAction.USER_LOGOUT);
