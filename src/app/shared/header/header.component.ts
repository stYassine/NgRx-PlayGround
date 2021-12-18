import { Component, OnInit } from '@angular/core';

/// NgRx
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';

/// RxJs
import { Observable, of } from 'rxjs';
import { checkIfAuthenticated } from 'src/app/auth/store/auth.selectors';
import { logout } from 'src/app/auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isAuthenticated$: Observable<boolean>;

  constructor(
    public store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(checkIfAuthenticated);
  }

  public logout(event: Event){
    console.log('LOG OUT HOMIE');
    event.preventDefault();
    this.store.dispatch(logout());
  }

}
