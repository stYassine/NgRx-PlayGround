import { BrowserModule } from '@angular/platform-browser';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/// Modules
import { AppRoutingModule } from './app-routing.module';


/// Services
import { AuthService } from './auth/services/auth.service';

/// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';


/// ngrx
import { StoreModule } from '@ngrx/store';
import { appReducer } from './store/app.state';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import { AuthTokenInterceptor } from './auth/services/auth-token.interceptor';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer } from './store/router/custom-serializer';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([AuthEffects]),
    StoreModule.forRoot(appReducer),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    // StoreDevtoolsModule.instrument({
    //   maxAge: 25, // Retains last 25 states
    //   logOnly: environment.production, // Restrict extension to log-only mode
    //   autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    // }),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer
    })
  ],
  // providers: [
  //   {provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true}
  // ],
  bootstrap: [AppComponent]
})
export class AppModule { }
