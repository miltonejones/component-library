import { Injectable } from '@angular/core';

import * as tokyoData from './data/tokyo.json';
import * as icelandData from './data/iceland.json';
import * as berlinData from './data/berlin.json';
import * as hollandData from './data/amsterdam.json';
import * as norwayData from './data/norway.json';

import * as africaData from './data/africa.json';
import * as alaskaData from './data/alaska.json';
import * as chinaData from './data/china.json';
import * as amsterdamData from './data/amsterdam.json';

import { PhotoType } from './photo-type.enum';

@Injectable({
  providedIn: 'root'
})
export class DataSelectorService {
  photoTypes = [
    { key: PhotoType.NORWAY, data: norwayData },
    { key: PhotoType.TOKYO, data: tokyoData },
    { key: PhotoType.ICELAND, data: icelandData },
    { key: PhotoType.BERLIN, data: berlinData },
    { key: PhotoType.HOLLAND, data: hollandData },
    { key: PhotoType.AFRICA, data: africaData },
    { key: PhotoType.ALASKA, data: alaskaData },
    { key: PhotoType.CHINA, data: chinaData },
    { key: PhotoType.INDIA, data: amsterdamData }
  ];
  photoType: any = {};
  constructor() { 
    this.photoType = this.photoTypes[Math.floor(Math.random() * this.photoTypes.length)]
  }
}
