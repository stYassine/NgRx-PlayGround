import { createReducer, on } from '@ngrx/store';
import { initialState } from './posts.state';
import { createPost, createPostSuccess, updatePost, updatePostSuccess, deletePost, loadPostsSuccess } from './posts.actions';

export const postsReducer = createReducer(
  initialState,

  // on(createPost, (state, action) => {
  //   let post = {...action.post};
  //   post['id'] = (state.posts.length + 1).toString();

  //   return {
  //     ...state,
  //     posts: [...state.posts, post]
  //   }
  // }),
  on(createPostSuccess, (state, action) => {
    let post = {...action.post};

    return {
      ...state,
      posts: [...state.posts, post]
    }
  }),  

  // on(updatePost, (state, action) => {
  //   const updatedPosts = state.posts.map((p) => {      
  //     if(action.post.id === p.id){
  //       p = action.post;
  //     }
  //     return p;
  //   });
  //   return {
  //     ...state,
  //     posts: updatedPosts
  //   }
  // }),
  on(updatePostSuccess, (state, action) => {
    const updatedPosts = state.posts.map((p) => {      
      if(action.post.id === p.id){
        p = action.post;
      }
      return p;
    });
    return {
      ...state,
      posts: updatedPosts
    }
  }),

  

  on(deletePost, (state, action) => {
    const filteredPosts = state.posts.filter((p) => p.id != action.id );

    return {
      ...state,
      posts: filteredPosts
    }
  }),

  on(loadPostsSuccess, (state, action) => {
    return {
      ...state,
      posts: action.posts
    }
  }),
  

);