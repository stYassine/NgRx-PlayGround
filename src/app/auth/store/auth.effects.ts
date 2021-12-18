import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError, tap, mergeMap } from 'rxjs/operators';

import { loginStart, loginSuccess, loginFail, registerStart, registerSuccess, autoLogin, logout } from './auth.actions';
import { AuthService } from '../services/auth.service';
import { AuthResponse } from 'src/app/models/AuthResponse.model';
import { AppState } from 'src/app/store/app.state';
import { setErrorMessage, setLoading } from 'src/app/shared/store/shared.actions';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions, 
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
    ) {}

  public login$ = createEffect(() => {
    // this.store.dispatch(setLoading({status: true})); /// can be called Here
    return this.actions$.pipe(ofType(loginStart), exhaustMap(action => {
      return this.authService
        .login(action.email, action.password)
        .pipe(
          map((data: AuthResponse) => {
            this.store.dispatch(setLoading({status: false}));
            this.store.dispatch(setErrorMessage({message: ''}));

            const user = this.authService.formatUser(data);
            this.authService.saveToLocalStorage(user);

            return loginSuccess({user, redirect: true});
          }),
          catchError(err => {
            this.store.dispatch(setLoading({status: false}));
            // this.store.dispatch(setErrorMessage({message: 'Login Failed'}));
            return of(setErrorMessage({message: 'Login Failed'})); /// return an Observable
          })
        )
    }))
  });

  // Redirect After Login || Register
  // dispatch: false ( we're not going to return any Observable or Anything)
  public loginRedirect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(...[loginSuccess, registerSuccess]),
      /// Tap: will return noting
      /// map: Expect to return something
      tap((action) => {
        if(action.redirect){
          this.router.navigate(['/']);
        }
      })
    )
  }, {dispatch: false});


  public register$ = createEffect(() => {
    return this.actions$.pipe(ofType(registerStart), exhaustMap(action => {
      return this.authService
        .register(action.email, action.password)
        .pipe(
          map((data: AuthResponse) => {
            const user = this.authService.formatUser(data);

            this.store.dispatch(setLoading({status: false}));
            this.store.dispatch(setErrorMessage({message: ''}));

            return registerSuccess({user, redirect: true});
          }),
          catchError(err => {
            this.store.dispatch(setLoading({status: false}));
            // this.store.dispatch(setErrorMessage({message: 'Login Failed'}));
            return of(setErrorMessage({message: 'Register Failed'})); /// return an Observable
          })
        )
    }))
  });

  public autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogin),
      mergeMap((action) => {
        const user = this.authService.getUserFromLocalStorage();
        console.log(user);
        return of(loginSuccess({user, redirect: false}));
      }) 
    );
  });

  public logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(logout),
      map(() => {
        this.authService.logout();
        this.router.navigate(['/auth']);
      })
    )
  }, {dispatch: false});

}
