import { Component, OnInit } from '@angular/core';
import { generateLogo } from '../shared/util';
export const PHOTO_SIZES = [72,96,128,144,152,192,384,512]
@Component({
  selector: 'app-hero-background',
  templateUrl: './hero-background.component.html',
  styleUrls: ['./hero-background.component.scss']
})
export class HeroBackgroundComponent implements OnInit {

  index = 0;
  sources: string[] = [];
  dataURL = generateLogo(128);
  readonly sizes = PHOTO_SIZES;
  src = '';
  constructor() { }


  next() {
    if (this.index < PHOTO_SIZES.length) {
      generateLogo(PHOTO_SIZES[this.index])
        .subscribe(src => {
          this.sources.push(src);
          this.index ++;
          this.next();
        })
    }
  }

  ngOnInit(): void {
    // this.dataURL.subscribe(src => this.src = src)
    this.next();
  }

}
/**CREATE src/assets/icons/icon-128x128.png (1253 bytes)
CREATE src/assets/icons/icon-144x144.png (1394 bytes)
CREATE src/assets/icons/icon-152x152.png (1427 bytes)
CREATE src/assets/icons/icon-192x192.png (1790 bytes)
CREATE src/assets/icons/icon-384x384.png (3557 bytes)
CREATE src/assets/icons/icon-512x512.png (5008 bytes)
CREATE src/assets/icons/icon-72x72.png (792 bytes)
CREATE src/assets/icons/icon-96x96.png (958 bytes) */