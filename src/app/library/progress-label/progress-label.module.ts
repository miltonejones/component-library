import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressLabelDirective } from './progress-label.directive';



@NgModule({
  declarations: [ProgressLabelDirective],
  exports: [ProgressLabelDirective],
  imports: [
    CommonModule
  ]
})
export class ProgressLabelModule { }
