import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as newsData from './news-scroll/data/news.json';

export const NEWS_API_KEY = "ae230f263ba24e9e8106e38970b4c747";

@Injectable({
  providedIn: 'root'
})
export class NewsScrollService {

  constructor(private http: HttpClient) { }
  getNews() {
    const address = `http://newsapi.org/v2/everything?q=iceland&from=2021-01-04&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`;
    return new Observable<any>(observer => {
      this.http.get(address)
        .pipe(catchError(err => {
          console.log({err})
          observer.next(newsData.default);
          return of([])
        }))
        .subscribe(data => observer.next(data));
    });
  }
}
