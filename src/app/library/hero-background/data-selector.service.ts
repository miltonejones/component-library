import { Injectable } from '@angular/core';

import * as tokyoData from './data/tokyo.json';
import * as icelandData from './data/iceland.json';
import * as berlinData from './data/berlin.json';
import * as hollandData from './data/amsterdam.json';
import * as norwayData from './data/norway.json';
import * as africaData from './data/africa.json';
import * as alaskaData from './data/alaska.json';
import * as chinaData from './data/china.json';
import * as indiaData from './data/india.json';
import * as ricoData from './data/puerto_rico.json';

import { PhotoType } from './photo-type.enum';
import { PhotoTypeItem } from './viewmodel/photo-type-item';

export const COOKIE_NAME = 'photo-type-persister';

@Injectable({
  providedIn: 'root'
})
export class DataSelectorService {
  photoTypes: PhotoTypeItem[] = [
    { key: PhotoType.NORWAY, data: norwayData },
    { key: PhotoType.TOKYO, data: tokyoData },
    { key: PhotoType.ICELAND, data: icelandData },
    { key: PhotoType.BERLIN, data: berlinData },
    { key: PhotoType.HOLLAND, data: hollandData },
    { key: PhotoType.AFRICA, data: africaData },
    { key: PhotoType.ALASKA, data: alaskaData },
    { key: PhotoType.CHINA, data: chinaData },
    { key: PhotoType.INDIA, data: indiaData },
    { key: PhotoType.PUERTORICO, data: ricoData }
  ];
  photoType: PhotoTypeItem = {} as PhotoTypeItem;
  constructor() { 
    // this.photoType = this.photoTypes[Math.floor(Math.random() * this.photoTypes.length)]
    this.setSource(this.getSource());
  }
  setSource(key: PhotoType) {
    this.photoType = this.photoTypes.filter(type => type.key === key)[0];
    localStorage[COOKIE_NAME] = key;
  }
  getSource(): PhotoType {
    const key: any = localStorage[COOKIE_NAME];
    if (key) {
      return key as PhotoType;
    }
    return this.photoTypes[Math.floor(Math.random() * this.photoTypes.length)].key;
  }
}
