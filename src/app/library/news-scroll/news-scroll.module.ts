import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsScrollComponent } from './news-scroll/news-scroll.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [NewsScrollComponent],
  exports: [NewsScrollComponent],
  imports: [
    HttpClientModule,
    CommonModule
  ]
})
export class NewsScrollModule { }
