import { createSelector, createFeatureSelector } from '@ngrx/store';
import { PostState } from '.';



export const getPostState = createFeatureSelector<PostState>('posts');

export const getPosts = createSelector(
  getPostState,
  (state) => state.entity
)
