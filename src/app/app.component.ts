import { Component } from '@angular/core';
import { PhotoDatum } from './library';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'library-sandbox';
  selected: PhotoDatum = {} as PhotoDatum;
  photoChange(e: PhotoDatum) {
    this.selected = e;
  }
}
