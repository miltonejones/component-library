import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterHighlightDirective } from './filter-highlight.directive';



@NgModule({
  declarations: [FilterHighlightDirective],
  exports: [FilterHighlightDirective],
  imports: [
    CommonModule
  ]
})
export class FilterHighlightModule { }
