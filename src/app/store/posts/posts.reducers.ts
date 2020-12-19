import { IPosts } from "@app/models/backend/Posts";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Action, createReducer, on } from "@ngrx/store";
import * as postAction from "./posts.actions"
export interface PostState {
  entity: IPosts[];
  loading: boolean;
  error: any;
}

const initialState: PostState = {
  entity: [],
  loading: false,
  error: null,

};


const PostReducer = createReducer(
  initialState,
  on(postAction.postStart, state => ({ ...state, loading: true, entity: [] })),
  on(postAction.postAddStart, state => ({ ...state, loading: true, entity: [] })),
  on(postAction.postEditStart, state => ({ ...state, loading: true,  entity: [] })),
  on(postAction.postRemoveStart, state => ({ ...state, loading: true,  entity: [] })),
  on(postAction.postSuccess, (state, props) => ({ ...state, entity: props.posts, loading: false })),

  on(postAction.postFail, (state, props) => ({ ...state, error: props.error, loading: false })),

);

export function postReducer(
  state = initialState,
  action: Action
) {
  return PostReducer(state, action);
}
