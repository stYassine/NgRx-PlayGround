import { createReducer, on } from '@ngrx/store';
import { initialState, initialState_OLD, postsAdapter } from './posts.state';
import { createPost, createPostSuccess, updatePost, updatePostSuccess, deletePost, loadPostsSuccess } from './posts.actions';


export const postsReducer = createReducer(
  initialState,

  on(loadPostsSuccess, (state, action) => {
    return postsAdapter.setAll(action.posts, state);
  }),

  on(createPostSuccess, (state, action) => {
    // return postsAdapter.addOne(action.post, state);
    return postsAdapter.addOne(action.post, {...state, count: state.count+1});
  }),  

  on(updatePostSuccess, (state, action) => {
    return postsAdapter.updateOne(action.post, state);
  }),

  on(deletePost, (state, action) => {
    return postsAdapter.removeOne(action.id, state);
  }),

);




























////////////////////////////////////////
/// NO NgRx/Entity
////////////////////////////////////////
export const postsReducer_OLD = createReducer(
  initialState_OLD,

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
  // on(updatePostSuccess, (state, action) => {
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