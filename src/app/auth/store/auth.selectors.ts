import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';
import { authFeatureKey } from './index';

const getAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const checkIfAuthenticated = createSelector(
  getAuthState,
  (state: AuthState) => {
    return state.user ? true : false
  }
);

export const getToken = createSelector(
  getAuthState,
  (state: AuthState) => {
    return state.user ? state.user.userToken : null
  }
);