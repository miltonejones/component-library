import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoCreditComponent } from './photo-credit.component';



@NgModule({
  declarations: [PhotoCreditComponent],
  exports: [PhotoCreditComponent],
  imports: [
    CommonModule
  ]
})
export class PhotoCreditModule { }
