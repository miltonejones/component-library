import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RacingClockComponent } from './racing-clock.component';



@NgModule({
  declarations: [RacingClockComponent],
  exports: [RacingClockComponent],
  imports: [
    CommonModule
  ]
})
export class RacingClockModule { }
