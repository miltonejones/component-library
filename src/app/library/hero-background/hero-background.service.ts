import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as photoData from './data/africa.json';

@Injectable({
  providedIn: 'root'
})
export class HeroBackgroundService {

  constructor() { }

  getPhotos() {
    return new Observable(observer => {
      observer.next(photoData.default)
    })
  }

}
