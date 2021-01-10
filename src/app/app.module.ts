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
  ProgressLabelModule,
  ScrollingTextModule
} from './library';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RacingClockModule,
    ScrollingTextModule,
    // ProgressLabelModule,
    NewsScrollModule,
    PhotoCreditModule,
    MediaPlayerModule,
    HeroBackgroundModule,
    BrowserAnimationsModule,
    SearchBoxModule,
    LocationMenuModule,
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [AudioAnalyserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
