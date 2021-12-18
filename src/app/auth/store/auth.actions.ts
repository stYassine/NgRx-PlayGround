import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

enum AuthActionsTypes{
  /// Login
  LoginStart = '[Auth Page] Login Start',
  LoginSuccess = '[Auth Page] Login Success',
  LoginFail = '[Auth Page] Login Fail',
  /// Register
  RegisterStart = '[Auth Page] Register Start',
  RegisterSuccess = '[Auth Page] Register Success',
  RegisterFail = '[Auth Page] Register Fail',
  /// Auto Login 
  AutoLogin = '[Auth Page] Auto Login',
  /// Logout
  Logout = '[Auth Page] Logout',
}

/// Login
export const loginStart = createAction(
  AuthActionsTypes.LoginStart, 
  props<{email: String, password: String}>()
);
export const loginSuccess = createAction(
  AuthActionsTypes.LoginSuccess, 
  props<{user: User, redirect: boolean}>()
);
export const loginFail = createAction(
  AuthActionsTypes.LoginFail, 
  props<{}>()
);

/// Register
export const registerStart = createAction(
  AuthActionsTypes.RegisterStart, 
  props<{email: String, password: String}>()
);
export const registerSuccess = createAction(
  AuthActionsTypes.RegisterSuccess, 
  props<{user: User, redirect: boolean}>()
);
export const registerFail = createAction(
  AuthActionsTypes.RegisterFail, 
  props<{}>()
);

///
export const autoLogin = createAction(AuthActionsTypes.AutoLogin);

/// Logout
export const logout = createAction(AuthActionsTypes.Logout);
