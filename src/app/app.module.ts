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
  LocationMenuModule,
  MediaPlayerModule,
  AudioAnalyserService,
  ProgressLabelModule
} from './library';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RacingClockModule,
    // ProgressLabelModule,
    NewsScrollModule,
    PhotoCreditModule,
    MediaPlayerModule,
    HeroBackgroundModule,
    BrowserAnimationsModule,
    SearchBoxModule,
    LocationMenuModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [AudioAnalyserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
