import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
/// NgRx
import { AppState } from 'src/app/store/app.state';
import { Store, select } from '@ngrx/store';
import { loginStart } from '../store/auth.actions';
import { setLoading } from '../../shared/store/shared.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(public store: Store<AppState>) { }

  ngOnInit(): void {
    this.initForm();
  }

  public initForm(){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(99)]),
    });
  }

  public loginUser(){
    const { email, password } = this.loginForm.value;
    console.log(email, password);
    
    this.store.dispatch(setLoading({status: true}));
    this.store.dispatch(loginStart({email, password}));
  }

}
