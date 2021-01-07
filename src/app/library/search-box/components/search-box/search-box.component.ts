import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { GlobalEventService } from 'src/app/library/shared/global-event.service';
import { CollapseEvent } from 'src/app/library/shared/viewmodel/collapse-event.enum';
const COOKIE_NAME = 'app-search-box-saved-search';
@Component({
  selector: 'app-search-box',
  template: `
  <div [@extend]="state" class="search-box-body" [ngClass]="state">
    <i class="fas fa-search"></i>
      <input 
        (focus)="focus(true)" 
        (blur)="exit()" 
        type="text" [(ngModel)]="value" (change)="find()" placeholder="Search Google"/>
    <ul *ngIf="state === 'on' && saved.length">
    <li (click)="find(s)" *ngFor="let s of saved">
      <div class="icon"><i class="fas fa-clock"></i></div>
      <div class="text">{{s}}</div>
      <div class="close">&times;</div>
    </li>
    </ul>
  </div>
  `,
  styleUrls: ['./search-box.component.scss'],
  animations: [
    trigger('extend', [
      state('on', style({ width: '94vw' })),
      state('off', style({ width: '240px', height: 'inherit', opacity: '.6' })),
      transition('* => *', [animate('300ms linear')])
    ])
  ]
})
export class SearchBoxComponent implements OnInit {
  value = '';
  state = 'off';
  saved = [];
  constructor(private service: GlobalEventService) { }

  ngOnInit(): void {
    this.load();
  }
  load() {
    this.saved = JSON.parse(localStorage[COOKIE_NAME] || '[]');
  }
  save(value: string) {
    const cookie = JSON.parse(localStorage[COOKIE_NAME] || '[]')
      .filter((f: string) => f !== value);
    cookie.unshift(value);
    localStorage[COOKIE_NAME] = JSON.stringify(cookie.slice(0, 4));
    this.load();
  }
  exit() {
    setTimeout(() => this.focus(false), 199);
  }
  focus(on = true) {
    this.state = on ? 'on' : 'off';
    this.service.elementCollapse.emit(on ? CollapseEvent.EXPAND : CollapseEvent.COLLAPSE);
  }
  find(value?: string): void {
    if (value !== undefined) { this.value = value; }
    const address = this.value.indexOf('://') > -1 
      ? this.value 
      : ('https://www.google.com/search?q=' + this.value)
    window.open(address);
    this.save(this.value);
    this.value = '';
  }
}
