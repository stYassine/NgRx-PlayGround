import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AuthResponse } from 'src/app/models/AuthResponse.model';
import { User } from 'src/app/models/user.model';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { autoLogin, logout } from '../store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private FIREBASE_AUTH_LOGIN_API = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=';
  private FIREBASE_AUTH_REGISTER_API = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';

  private LOCAL_STORAGE_USER = 'userData';

  public timeOutInterval: any;

  constructor(
    public httpClient: HttpClient,
    private store: Store<AppState>
  ) { }

  public login(email: String, password: String): Observable<AuthResponse>{
    return this.httpClient.post<AuthResponse>(`${this.FIREBASE_AUTH_LOGIN_API}${environment.FIREBASE_API_KEY}`, {email, password, returnSecureToken: true});
  }

  public register(email: String, password: String): Observable<AuthResponse>{
    return this.httpClient.post<AuthResponse>(`${this.FIREBASE_AUTH_REGISTER_API}${environment.FIREBASE_API_KEY}`, {email, password, returnSecureToken: true});
  }

  public formatUser(data: AuthResponse){
    const expirationDate = new Date(new Date().getTime() + +data.expiresIn * 1000);
    let user = new User(data.email, data.refreshToken, data.localId, expirationDate);
    return user;
  }

  public saveToLocalStorage(user: User){
    localStorage.setItem(this.LOCAL_STORAGE_USER, JSON.stringify(user));

    this.runTimeOutInterval(user);
  }

  public getUserFromLocalStorage(){
    const userData = localStorage.getItem(this.LOCAL_STORAGE_USER);
    if(userData){
      const jsonData = JSON.parse(userData);
      const expirationDate = new Date(jsonData.expireDate);
      const user = new User(jsonData.email,jsonData.token, jsonData.localId, expirationDate);

      this.runTimeOutInterval(user);

      return user;
    }

    return null;
  }

  private runTimeOutInterval(user: User){
    const todaysDate = new Date().getTime();
    const expirationDate = user.expireDate.getTime();
    const timeInterval = expirationDate - todaysDate;

    this.timeOutInterval = setTimeout(() => {
      /// logout or get the Token
      this.store.dispatch(logout());

    }, timeInterval);
  }

  public logout(){
    localStorage.removeItem(this.LOCAL_STORAGE_USER);
    if(this.timeOutInterval){
      clearInterval(this.timeOutInterval);
      this.timeOutInterval = null;
    }
  }


}
