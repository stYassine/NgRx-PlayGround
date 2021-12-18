import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from './posts.state';

const getPostsState = createFeatureSelector<PostsState>('posts');

export const getPosts = createSelector(
  getPostsState,
  (state: PostsState) => state.posts
);

export const getPostById = createSelector(
  getPostsState,
  (state: PostsState, props) => state.posts.find((p) => p.id === props.id)
);
