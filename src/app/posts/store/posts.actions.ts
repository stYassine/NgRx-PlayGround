import { createAction, props } from '@ngrx/store';
import { Post } from 'src/app/models/posts.model';

enum PostsActionsTypes{
  LoadPosts = '[Posts Page] Load Posts',
  LoadPostsSuccess = '[Posts Page] Load Posts Success',
  
  AddPost = '[Posts Page] Add Post',
  AddPostSuccess = '[Posts Page] Add Post Success',

  UpdatePost = '[Posts Page] Update Post',
  UpdatePostSuccess = '[Posts Page] Update Post Success',
  
  DeletePost = '[Posts Page] Delete Post',
  DeletePostSuccess = '[Posts Page] Delete Post Success'
}

/// Load
export const loadPosts = createAction(PostsActionsTypes.LoadPosts);
export const loadPostsSuccess = createAction(
  PostsActionsTypes.LoadPostsSuccess,
  props<{posts: Post[]}>()
);

// Create
export const createPost = createAction(
  PostsActionsTypes.AddPost, 
  props<{post: Post}>()
);
export const createPostSuccess = createAction(
  PostsActionsTypes.AddPostSuccess, 
  props<{post: Post}>()
);

// Update
export const updatePost = createAction(
  PostsActionsTypes.UpdatePost, 
  props<{post: Post}>()
);
export const updatePostSuccess = createAction(
  PostsActionsTypes.UpdatePostSuccess, 
  props<{post: Post}>()
);

// Delete
export const deletePost = createAction(
  PostsActionsTypes.DeletePost, 
  props<{id: string}>()
);
export const deletePostSuccess = createAction(
  PostsActionsTypes.DeletePostSuccess, 
  props<{id: string}>()
);

