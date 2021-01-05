import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroBackgroundComponent } from './hero-background.component';
import { HeroBackgroundDirective } from './hero-background.directive';



@NgModule({
  declarations: [HeroBackgroundComponent, HeroBackgroundDirective],
  exports: [HeroBackgroundComponent, HeroBackgroundDirective],
  imports: [
    CommonModule
  ]
})
export class HeroBackgroundModule { }
