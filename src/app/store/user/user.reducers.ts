import { IPosts } from "@app/models/backend/Posts";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Action, createReducer, on } from "@ngrx/store";
import * as userAction from "./user.actions";

export interface UserState {
  entity: any;
  loading: boolean;
  error: any;
}

const initialState: UserState = {
  entity: null,
  loading: false,
  error: null,

};


const AuthReducer = createReducer(
  initialState,
  on(userAction.authStart, state => ({ ...state, loading: true, entity: null })),
  on(userAction.authSuccess, (state, props) => ({ ...state, loading: true, entity: props.auth })),
  on(userAction.authFail, (state, props) => ({ ...state, error: props.error, loading: false })),
  on(userAction.authLogout, (state) => ({ ...state, entity: null  })),

);

export function authReducer(
  state = initialState,
  action: Action
) {
  return AuthReducer(state, action);
}
