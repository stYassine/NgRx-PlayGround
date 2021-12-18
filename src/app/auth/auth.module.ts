import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

/// Components
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

/// Services
import { AuthService } from './services/auth.service';

/// NgRx
import * as fromAuth from './store';
import { AuthEffects } from './store/auth.effects';

/// Routes
export const routes: Routes = [
  {
    path: '', children: [
      { path: '', redirectTo : 'login'},
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ]
  },
];




@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    // EffectsModule.forFeature([AuthEffects]),
    EffectsModule.forFeature(),
    // StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducer)
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
