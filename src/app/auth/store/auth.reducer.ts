import { createReducer, on } from '@ngrx/store';
import { initialState } from './auth.state';
import { loginSuccess, registerSuccess, logout } from './auth.actions';

export const authReducer = createReducer(
  initialState,  

  on(loginSuccess, (state, action) => {
    return {
      ...state,
      user: action.user
    }
  }),

  on(registerSuccess, (state, action) => {
    return {
      ...state,
      user: action.user
    }
  }),

  on(logout, (state, action) => {
    return {
      ...state,
      user: null
    }
  }),


);