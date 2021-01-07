import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EqLabelDirective } from './eq-label.directive';



@NgModule({
  declarations: [EqLabelDirective],
  exports: [EqLabelDirective],
  imports: [
    CommonModule
  ]
})
export class EqLabelModule { }
