import { AfterViewChecked, Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { createElement, createRandomKey, generateProgress, numberFromStyle, setStyle } from '../shared/util';



@Directive({
  selector: '[progress-label]'
})
export class ProgressLabelDirective implements AfterViewChecked {
  @Input('progress-label') progress = 0;
  @Input('back-color') backColor = '#c5dcf1';
  @Input('fore-color') foreColor = '#f8b26a';
  @Input('inner-text') innerText: string | unknown = '';
  @Output() seek = new EventEmitter<number>();
  was = 0;
  currentAnimation: Animation = {} as Animation;
  protected el: HTMLElement;
  protected scroller: HTMLElement = {} as HTMLElement;
 

  constructor(el: ElementRef) {
    this.el = el.nativeElement;
  }

  ngAfterViewChecked(): void {
    if (this.was !== this.progress) {
      this.setProgress();
      this.was = this.progress;
    }
  }

  setProgress(): void {
    this.initProgress();
    const w = numberFromStyle(window.getComputedStyle(this.el).width);
    const h = numberFromStyle(window.getComputedStyle(this.el).height);
    const p = w * (this.progress / 100);
    this.el.style.backgroundSize = `${p}px ${h}px`;
    if (this.innerText !== this.scroller.innerText) {
      this.scroller.innerText = this.innerText as string;
    }
  }

  animate(id: any): void {
    const element: HTMLElement = document.getElementById(id) as HTMLElement;
    if (element.offsetWidth > this.el.offsetWidth) {
      this.currentAnimation = element.animate([
        // keyframes
        { transform: 'translateX(-100%)' },
        { transform: 'translateX(99%)' }
      ], {
        // timing options
        duration: 90000,
        iterations: Infinity
      });
      setStyle(this.el, {padding: '0'})
      return;
    }
    setStyle(this.el, {padding: '0 4px'})
  }

  initProgress(): void {
    if (!this.el.classList.contains('progress-bar-enabled')) {
      this.scroller = createElement('div', {
        position: 'absolute',
        left: '0px',
        top: '0px',
        margin: '2px 0',
        height: '12px',
        padding: '0 6px',
        fontSize: '.9rem'
      });
      this.scroller.classList.add('auto-sliding-text');
      this.scroller.innerText = this.innerText as string;
      this.el.innerText = '';
      this.el.appendChild(this.scroller);
      this.scroller.style.animation = `${name} 20s ease-in`;
      this.scroller.id = createRandomKey();
      this.el.classList.add('progress-bar-enabled');
      this.el.style.backgroundImage = 'url(' + generateProgress(this.foreColor) + ')';
      this.el.style.backgroundRepeat = `no-repeat`;
      this.el.style.backgroundPosition = `0px 0px`;
      this.el.style.backgroundColor = this.backColor;
      // this.el.style.borderRadius = '5px';
      this.el.style.position = 'relative';
      this.el.addEventListener('mousedown', (e: MouseEvent) => {
        const w = numberFromStyle(window.getComputedStyle(this.el).width);
        this.seek.emit(e.offsetX / w);
      });
      this.animate(this.scroller.id);
      // moveByFrame(this.scroller.id, 10000, this.el.offsetWidth);
    }
  }
}