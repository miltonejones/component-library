import { Component, EventEmitter } from '@angular/core';
import { PhotoDatum } from './library';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'library-sandbox';
  selected: PhotoDatum = {} as PhotoDatum;
  musicSelected = new EventEmitter<void>();
  photoChange(e: PhotoDatum) {
    this.selected = e;
  }
  selectMusic() {
    this.musicSelected.emit();
  }
}
