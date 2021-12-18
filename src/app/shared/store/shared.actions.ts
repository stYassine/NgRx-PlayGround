import { createAction, props } from '@ngrx/store';

enum SharedActionsTypes{
  SetLoadingAction = '[Shared State] Set Loading Spinner',
  SetErrorMessage = '[Shared State] Set Error Message'
}

export const setLoading = createAction(
  SharedActionsTypes.SetLoadingAction, 
  props<{status: boolean}>()
);
export const setErrorMessage = createAction(
  SharedActionsTypes.SetErrorMessage, 
  props<{message: string}>()
);