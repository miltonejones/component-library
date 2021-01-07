import { Pipe, PipeTransform } from '@angular/core';
import { Mediafile } from '../viewmodel/mediafile';

@Pipe({
  name: 'trackInfo'
})
export class TrackInfoPipe implements PipeTransform {

  transform(file: Mediafile, ...args: unknown[]): unknown {
    const info = [file.Title];
    if (file.artistName?.length) {
      info.push(file.artistName);
    }
    if (file.albumName?.length) {
      info.push(file.albumName);
    }
    return info.join(' - ');
  }

}
