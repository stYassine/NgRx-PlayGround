import { createReducer, on } from '@ngrx/store';
import { initialState } from './counter.state';

import { increment, decrement, reset, incrementBy, changeChannelName } from './counter.actions';

export const counterReducer = createReducer(
  initialState,
  
  on(increment, (state) => {
    return {
      ...state,
      counter: state.counter +1
    }
  }),
  on(decrement, (state) => {
    return {
      ...state,
      counter: state.counter -1
    }
  }),
  on(reset, (state) => {
    return {
      ...state,
      counter: 0
    }
  }),

  /// with Props
  on(incrementBy, (state, action) => {
    return {
      ...state,
      counter: action.payload
    }
  }),
  
  on(changeChannelName, (state) => {
    return {
      ...state,
      channel: 'Channel Changed'
    }
  }),

);


