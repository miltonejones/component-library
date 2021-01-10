import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingTextComponent } from './scrolling-text.component';
import { HttpClientModule } from '@angular/common/http';
import { TruncatePipe } from '../shared/pipes/truncate.pipe';



@NgModule({
  declarations: [ScrollingTextComponent, TruncatePipe],
  exports: [ScrollingTextComponent, TruncatePipe],
  imports: [
    HttpClientModule,
    CommonModule
  ]
})
export class ScrollingTextModule { }
