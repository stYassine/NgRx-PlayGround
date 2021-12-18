import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

export const productsFeatureKey = 'products';

export interface AppState {

}

export const reducers: ActionReducerMap<AppState> = {

};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
