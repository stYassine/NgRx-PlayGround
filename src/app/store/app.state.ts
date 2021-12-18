import { RouterReducerState, routerReducer } from "@ngrx/router-store";
import { authReducer } from "../auth/store/auth.reducer";
import { AuthState } from "../auth/store/auth.state";
import { counterReducer } from "../counter/store/counter.reducer";
import { CounterState } from "../counter/store/counter.state";
import { postsReducer } from "../posts/store/posts.reducer";
import { PostsState } from "../posts/store/posts.state";
import { sharedReducer } from "../shared/store/shared.reducer";
import { SharedState } from "../shared/store/shared.state";


/// Anything Here is Shared Across the Entire Application
export interface AppState{
  // counter: CounterState;
  // posts: PostsState;
  shared: SharedState;
  auth: AuthState;
  router: RouterReducerState; // Ngrx-router
}
/// Anything Here is Shared Across the Entire Application

export const appReducer = {
  // counter: counterReducer,
  // posts: postsReducer
  shared: sharedReducer,
  auth: authReducer,
  router: routerReducer // Ngrx-router
};