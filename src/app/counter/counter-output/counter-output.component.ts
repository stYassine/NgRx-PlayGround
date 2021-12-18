import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { getCounter } from '../../counter/store/counter.selectors';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css']
})
export class CounterOutputComponent implements OnInit {
  public counter$: Observable<number>;

  constructor(public store: Store<AppState>) { }

  ngOnInit(): void {
    this.counter$ = this.store.pipe(select(getCounter));
  }

}
