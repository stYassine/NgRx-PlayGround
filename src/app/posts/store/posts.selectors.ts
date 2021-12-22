import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterStateUrl } from 'src/app/store/router/custom-serializer';
import { getCurrentRoute } from 'src/app/store/router/router.selector';
import { PostsState_OLD, PostsState, postsAdapter } from './posts.state';

const getPostsState_OLD = createFeatureSelector<PostsState_OLD>('posts');

export const getPosts_OLD = createSelector(
  getPostsState_OLD,
  (state: PostsState_OLD) => state.posts
);

// export const getPostById = createSelector(
//   getPostsState,
//   (state: PostsState, props) => state.posts.find((p) => p.id === props.id)
// );

export const getPostById_OLD = createSelector(
  getPosts_OLD,
  getCurrentRoute,
  (posts, route: RouterStateUrl) => posts ? posts.find((p) => p.id === route.params['id']) : null
);

/// NgRx/Entities
const getPostsState = createFeatureSelector<PostsState>('posts');

export const postsSelectors = postsAdapter.getSelectors();

export const getPostsEntities = createSelector(
  getPostsState,
  postsSelectors.selectEntities
)

export const getPosts = createSelector(
  getPostsState,
  postsSelectors.selectAll
);

export const getPostById = createSelector(
  getPostsEntities,
  getCurrentRoute,
  (posts, route: RouterStateUrl) => posts ? posts[route.params['id']] : null
);


/// Select count
export const getCount = createSelector(
  getPostsState,
  (state: PostsState) => state.count
);



