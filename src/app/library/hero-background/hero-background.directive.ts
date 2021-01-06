import { Directive, EventEmitter, ElementRef, HostListener, OnChanges, OnInit, Output, SimpleChanges, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { PhotoDatum } from '../photo-credit/photo-datum';
import { randomize } from '../shared/util';
import { HeroBackgroundService } from './hero-background.service';

@Directive({
  selector: '[app-hero-background]'
})
export class HeroBackgroundDirective implements OnInit, OnChanges {
  @Output() photoChange = new EventEmitter<PhotoDatum>();
  @Input() refreshRate = 29999;
  protected el: HTMLElement;
  protected service: HeroBackgroundService;
  photos: PhotoDatum[] = [];
  selected: PhotoDatum = {} as PhotoDatum;
  index = 0;
  photo = '';
  backgroundPos = '';
  backgroundSize = '';
  timer = -1;
  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.sizeImageToWindow(this.buildURL(this.photo), this.selected)
      .subscribe(console.log);
  }
  constructor(el: ElementRef, h: HeroBackgroundService) {
    this.el = el.nativeElement;
    this.service = h;
  }
  ngOnInit() {
    this.init();
    this.service.dataChanged.subscribe(() => this.init());
  }
  init(): void {
    this.service.getPhotos()
      .subscribe((data: any) => {
        this.photos = this.curate(randomize(data));
        this.next();
      }); 
  }
  curate(photos: PhotoDatum[]) {
    const body = {
      w: document.body.offsetWidth,
      h: document.body.offsetHeight
    }
    const body_horiz = body.w > body.h;
    return photos.filter((im: PhotoDatum) => {
      const image_horiz = im.width > im.height;
      return image_horiz === body_horiz;
    })
  }
  ngOnChanges(ch: SimpleChanges): void {
    console.log(ch);
  }
  write() {
    this.el.style.backgroundImage = `url(${this.photo})`;
    this.el.style.backgroundSize = this.backgroundSize;
    this.el.style.backgroundPosition = this.backgroundPos;
  }
  sizeImageToWindow(image: string, selected: any): Observable<any> {
    return new Observable(observer => {
      const max = document.body.offsetWidth;
      const height = document.body.offsetHeight;
      const im = new Image();
      im.onload = () => { 
        this.backgroundPos = '0px 0px';
        const ratioX = max / im.width;
        const ratioY = height / im.height;
        const h = im.height * ratioX;
        const w = im.width * ratioY;
        this.backgroundSize = `${max}px ${height}px`;
        localStorage['default-image'] = image;
        if (selected) {
          this.selected = selected;
        }
        observer.next(image);
      }
      im.onerror = () => observer.next();
      im.src = image;
    });
  }

  before(image: string, selected: any) {
    this.sizeImageToWindow(image, selected)
      .subscribe((pic: string) => {
        if (pic) {
          this.photo = pic;
          this.write();
          this.photoChange.emit(selected);
        }
      });
  }

  buildURL(str: string) {
    const body = {
      w: document.body.offsetWidth,
      h: document.body.offsetHeight
    }
    return str.replace(/h=(\d+)\&w=(\d+)/, `h=${body.h}&w=${body.w}`);
  }

  next(): any {
    const body = {
      w: document.body.offsetWidth,
      h: document.body.offsetHeight
    }
    const selected = this.photos[this.index];
    if (this.timer) window.clearTimeout(this.timer);
    if (selected) {
      const diff = (selected?.width/selected?.height) / (body.w/body.h);
      if (diff < .66) {
        return window.requestAnimationFrame(() => this.next());
      }
      this.before(this.buildURL(selected?.src?.large2x), selected);
      this.index = ++this.index % this.photos.length;
      this.timer = window.setTimeout(() => this.next(), this.refreshRate);
    }
  }
}
