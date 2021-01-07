import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaPlayerComponent } from './media-player.component';
import { EqLabelModule } from '../eq-label/eq-label.module';
import { TrackInfoPipe } from './pipes/track-info.pipe';
import { ProgressLabelModule } from '../progress-label/progress-label.module';
import { EqPlayheadComponent } from './components/eq-playhead/eq-playhead.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { FilterHighlightModule } from '../filter-highlight/filter-highlight.module';



@NgModule({
  declarations: [MediaPlayerComponent, TrackInfoPipe, EqPlayheadComponent],
  exports: [MediaPlayerComponent, EqPlayheadComponent],
  imports: [
    FilterHighlightModule,
    ProgressLabelModule,
    FormsModule,
    ReactiveFormsModule,
    EqLabelModule,
    CommonModule
  ]
})
export class MediaPlayerModule { }
