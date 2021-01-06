import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataSelectorService } from './data-selector.service';
import { PhotoType } from './photo-type.enum';
import { PhotoTypeItem } from './viewmodel/photo-type-item';

@Injectable({
  providedIn: 'root'
})
export class HeroBackgroundService {
  dataChanged = new EventEmitter<void>();
  constructor(private selector: DataSelectorService) { }
  getPhotos() {
    return new Observable(observer => {
      console.log(this.selector.photoType.key)
      observer.next(this.selector.photoType.data.default)
    })
  }
  setSource(key: PhotoType): void {
    this.selector.setSource(key);
    this.dataChanged.emit();
  }
  get photoTypes(): PhotoTypeItem[] {
    return this.selector.photoTypes;
  }
  get photoType(): PhotoTypeItem {
    return this.selector.photoType;
  }
}