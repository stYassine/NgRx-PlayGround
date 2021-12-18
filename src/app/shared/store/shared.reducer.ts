import { createReducer, on } from '@ngrx/store';
import { initialState } from './shared.state';
import { setLoading, setErrorMessage } from './shared.actions';

export const sharedReducer = createReducer(
  initialState,  

  on(setLoading, (state, action) => {
    return {
      ...state,
      showLoading: action.status
    }
  }),
  on(setErrorMessage, (state, action) => {
    return {
      ...state,
      errorMessage: action.message
    }
  }),


);