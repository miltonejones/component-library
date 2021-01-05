import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  SearchBoxModule,
  NewsScrollModule,
  RacingClockModule,
  PhotoCreditModule,
  HeroBackgroundModule,
  LocationMenuModule
} from './library';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RacingClockModule,
    NewsScrollModule,
    PhotoCreditModule,
    HeroBackgroundModule,
    BrowserAnimationsModule,
    SearchBoxModule,
    LocationMenuModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
