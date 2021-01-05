import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationMenuComponent } from './location-menu.component';



@NgModule({
  declarations: [LocationMenuComponent],
  exports: [LocationMenuComponent],
  imports: [
    CommonModule
  ]
})
export class LocationMenuModule { }
