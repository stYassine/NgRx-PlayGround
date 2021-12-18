import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
/// NgRx
import { AppState } from 'src/app/store/app.state';
import { Store, select } from '@ngrx/store';
import { registerStart } from '../store/auth.actions';
import { setLoading } from '../../shared/store/shared.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;

  constructor(public store: Store<AppState>) { }

  ngOnInit(): void {
    this.initForm();
  }

  public initForm(){
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(99)]),
    });
  }

  public registerUser(){
    const { email, password } = this.registerForm.value;
    console.log(email, password);
    
    this.store.dispatch(setLoading({status: true}));
    this.store.dispatch(registerStart({email, password}));
  }

}
