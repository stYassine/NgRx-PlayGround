import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { increment, decrement, reset, incrementBy, changeChannelName } from '../../counter/store/counter.actions';
import { getChannelName } from '../../counter/store/counter.selectors';
import { CounterState } from '../store/counter.state';

@Component({
  selector: 'app-counter-buttons',
  templateUrl: './counter-buttons.component.html',
  styleUrls: ['./counter-buttons.component.css']
})
export class CounterButtonsComponent implements OnInit {

  public counterNumber: number = 0;
  public channelName: Observable<string>;

  constructor(public store: Store<{counter: CounterState}>) { }

  ngOnInit(): void {
    this.channelName = this.store.pipe(select(getChannelName));
  }


  public increment(){
    this.store.dispatch(increment());
  }
  public decrement(){
    this.store.dispatch(decrement());
  }
  public reset(){
    this.store.dispatch(reset());
  }

  public addToCounter(){
    this.store.dispatch(incrementBy({payload: this.counterNumber}));
  }
  public changeText(){
    this.store.dispatch(changeChannelName());
  }

}
