import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';


/// Components
import { CounterComponent } from './counter/counter.component';
import { CounterButtonsComponent } from './counter-buttons/counter-buttons.component';
import { CounterOutputComponent } from './counter-output/counter-output.component';

/// NgRx
import * as fromCounter from './store';

/// Routes
export const routes: Routes = [
  {
    path: '', component: CounterComponent
  },
];

@NgModule({
  declarations: [
    CounterComponent,
    CounterButtonsComponent,
    CounterOutputComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(fromCounter.counterFeatureKey, fromCounter.reducer)
  ]
})
export class CounterModule { }
