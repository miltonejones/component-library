import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Genre } from './viewmodel/genre';
import { Mediafile } from './viewmodel/mediafile';
import { generateKey } from '../shared/util';
export const MEDIA_URL = 'http://sandbox.miltonjones.nl:1932/';
@Injectable({
  providedIn: 'root'
})
export class MediaPlayerService {

  playLists: any[] = [];
  constructor(private http: HttpClient) { }
  getPlaylists() {
    return new Observable<any>(observer => {
      this.http.get<any>(`${MEDIA_URL}playlist`)
        .pipe(catchError(err => {
          console.log({ err })
          return of([])
        }))
        .subscribe(data => {
          data.map ((o: any) => o.listKey = generateKey(o.Title));
          this.playLists = data;
          observer.next(data);
        });
    });
  }
  getPlaylist(id: string) {
    const playlist = this.playLists.filter((p: any) => {
      return generateKey(p.Title as string) === generateKey(id)
    })[0];
    return new Observable<any>(observer => {
      if (!playlist) return observer.next()
      const Keys = playlist.related.filter((f: any) => !!f);
      this.getTrackListByKeys(Keys)
        .subscribe((value: any) => {
          const sorted: Array<Mediafile> = this.organize(playlist, value);
          observer.next(sorted)
        })
    });
  }
  // private methods
  organize(list: any, tracks: Array<Mediafile>): Array<Mediafile> {
    const output: Array<Mediafile> = [];
    // console.log({related: list.related});
    list.related.map((track: string, i: number) => {
      const found = tracks.filter((f: any) => this.stripExt(f.FileKey) == this.stripExt(track))[0];
      if (found) {
        const exist = output.filter((o: any) => o.FileKey === found.FileKey)[0];
        if (exist) {
          return;
        }
        found.trackNumber = i + 1;
        //  console.log(i, track)
        output.push(found);
      } else {

      }
    });
    return output;
  }
  stripExt(value: string | undefined): any {
    if (!(value && value.replace)) {
      return '';
    }
    const stripped = value.replace(/(\.mp3|\.opus|\.ogg)/g, ''); // /([^\.]+)\./.exec(value) ;
    if (stripped) {
      return stripped;
    }
    return value;
  }

  sort(a: any, b: any): number {
    return a.Title > b.Title ? 1 : -1;
  }
  getTrackListByKeys(Keys: Array<string>): Observable<Array<Mediafile>> {
    return this.http.post<Array<Mediafile>>(MEDIA_URL + `tune`, { Keys })
  }
  getGenres() {
    return new Observable<Genre[]>(observer => {
      this.http.get<Genre[]>(`${MEDIA_URL}genre`)
        .pipe(catchError(err => {
          console.log({ err })
          return of([])
        }))
        .subscribe(data => observer.next(data));
    });
  }
  getGenre(id: string) {
    return new Observable<Mediafile[]>(observer => {
      id = id.replace('&', '');
      this.http.get<Mediafile[]>(`${MEDIA_URL}genre?id=${id}`)
        .pipe(catchError(err => {
          console.log({ err })
          return of([])
        }))
        .subscribe(data => observer.next(data));
    });
  }
}
