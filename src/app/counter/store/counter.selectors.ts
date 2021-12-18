import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CounterState } from './counter.state';

const getCounterState = createFeatureSelector<CounterState>('counter');

export const getCounter = createSelector(
  getCounterState,
  (state: CounterState) => state.counter
);

export const getChannelName = createSelector(
  getCounterState,
  (state: CounterState) => state.channel
);