import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataSelectorService } from './data-selector.service';

@Injectable({
  providedIn: 'root'
})
export class HeroBackgroundService {
  constructor(private selector: DataSelectorService) { }
  getPhotos() {
    return new Observable(observer => {
      console.log(this.selector.photoType.key)
      observer.next(this.selector.photoType.data.default)
    })
  }
}