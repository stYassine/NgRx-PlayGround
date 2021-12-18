import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SharedState } from './shared.state';
import { sharedFeatureKey } from './index';

const getSharedState = createFeatureSelector<SharedState>(sharedFeatureKey);

export const getLoading = createSelector(
  getSharedState,
  (state: SharedState) => state.showLoading
);
export const getErrorMessage = createSelector(
  getSharedState,
  (state: SharedState) => state.errorMessage
);