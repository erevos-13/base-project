import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from ".";

export const getAuthState = createFeatureSelector<UserState>('auth');

export const getAuth = createSelector(
  getAuthState,
  (state) => state.entity
)
export const getLoadingPosts = createSelector(
  getAuthState,
  (state) => state.loading
)
