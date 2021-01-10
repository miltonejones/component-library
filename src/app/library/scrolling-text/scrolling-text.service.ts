import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as newsData from './scrolling-text-data/scrolling-data.json';
import { NewsArticleList } from './viewmodel/news-article-list';
export const NEWS_API_KEY = "ae230f263ba24e9e8106e38970b4c747";
export function pad(num: number, size: number) {
  var s = "000000000" + num;
  return s.substr(s.length-size);
}
export function formattedDate() {
  const m = pad(new Date().getMonth(), 2);
  const d = pad(new Date().getDate(), 2);
  const y = pad(new Date().getFullYear(), 4);
  return `${y}-${m}-${d}`;
}
@Injectable({
  providedIn: 'root'
})
export class ScrollingTextService {

  constructor(private http: HttpClient) { }
  subjectData(subject: string) {
    return newsData.default[subject] as NewsArticleList;
  }
  buildURL(subject: string): string {
    const address = ['http://newsapi.org/v2/everything?q='];
    address.push(subject, '&from=', formattedDate());
    address.push('&sortBy=publishedAt&apiKey=', NEWS_API_KEY);
    return address.join('');
  }
  getNews(subject: string) {
    const address = this.buildURL(subject);
    return new Observable<any>(observer => {
      console.log(address)
      this.http.get(address)
        .pipe(catchError(err => {
          console.log({err})
          observer.next(this.subjectData(subject));
          return of([])
        }))
        .subscribe(data => observer.next(data));
    });
  }
}
