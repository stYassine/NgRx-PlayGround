import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { autoLogin } from './auth/store/auth.actions';
import { getLoading, getErrorMessage } from './shared/store/shared.selectors';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ngrx-playground';
  public showLoading$: Observable<boolean>;
  public errorMessage$: Observable<string>;

  constructor(public store: Store<AppState>) { }

  ngOnInit(): void {
    this.showLoading$ = this.store.select(getLoading);
    this.errorMessage$ = this.store.select(getErrorMessage);

    this.store.dispatch(autoLogin()); 
  }

  public createProject(){
    
  }

  public deleteProject(project){
    
  }




}