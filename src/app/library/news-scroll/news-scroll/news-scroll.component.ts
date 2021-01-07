import { Component, OnInit } from '@angular/core';
import { NewsScrollService } from '../news-scroll.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-news-scroll',
  templateUrl: './news-scroll.component.html',
  styleUrls: ['./news-scroll.component.scss'],
  animations: [
    trigger('scroll', [
      state('on', style({left: '-110vw'})),
      transition('* => *', [
        style({left: '-110vw'}), 
        animate(60000, style({left: '80vw'}))
      ])
    ]) 
  ]
})
export class NewsScrollComponent implements OnInit {

  state = 0;
  articles: any[] = [];
  constructor(private service: NewsScrollService) { }

  ngOnInit(): void {
    this.service.getNews()
      .pipe(filter(f => f.articles?.length))
      .subscribe((articles: any) =>{
        console.log(articles)
        this.articles = articles.articles
      });
  }

  scrollDone() {
    this.state++;
    // this.articles = randomize(this.articles);
  }

}
