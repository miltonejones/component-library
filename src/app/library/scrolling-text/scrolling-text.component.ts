import { AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { style, animate, AnimationBuilder, AnimationPlayer } from '@angular/animations';
import { NewsArticleItem } from './viewmodel/news-article-item';
import { ScrollingTextService } from './scrolling-text.service';
import { NewsArticleList } from './viewmodel/news-article-list';
import { randomize } from '../shared/util';
const SCROLLER_SUBJECT = 'india';
const SCROLL_RATE = 60000;
@Component({
  selector: 'app-scrolling-text',
  templateUrl: './scrolling-text.component.html',
  styleUrls: ['./scrolling-text.component.scss']
})
export class ScrollingTextComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @Input() subject = SCROLLER_SUBJECT;
  cached = ''
  headerHeight = 195;
  bodyHeight = 195;
  articles: NewsArticleItem[] = [];
  readonly article: NewsArticleItem = {} as NewsArticleItem;
  scroller$: HTMLElement = {} as HTMLElement;
  @ViewChild('el') set inputRef(ref: ElementRef<HTMLInputElement>) {
    this.scroller$ = ref.nativeElement;
  }
  private factory = this.builder.build([
    style({ left: '-100%' }),
    animate(SCROLL_RATE, style({ left: '100%' }))
  ]);
  public player: AnimationPlayer = {} as AnimationPlayer;
  constructor(public builder: AnimationBuilder, private service: ScrollingTextService) { }

  ngOnInit() {
    // const im = new Image();
    // im.onload = () => {
    //   this.headerHeight = (im.height / im.width) * 260;
    //   this.bodyHeight = 400 - this.headerHeight;
    //   console.log(this.headerHeight, im.width, im.height);
    // };
    // im.src = this.article?.urlToImage;
    this.load();
  }
  load() {
    this.cached = this.subject;
    this.service.getNews(this.subject)
      .subscribe((data: NewsArticleList) => {
        this.articles = data.articles;
      })
  }
  ngAfterViewChecked() {
    if (this.cached !== this.subject) this.load();
  }
  ngAfterViewInit(): void {
    this.player = this.factory.create(this.scroller$, {});
    this.animate();
  }
  private animate() {
    this.player.reset();

    this.player.onDone(() => {
      this.articles = randomize(this.articles);
      this.animate();
    });

    this.player.play();
  }
}
 