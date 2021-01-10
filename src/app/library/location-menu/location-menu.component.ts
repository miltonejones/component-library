import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { DataSelectorService } from '../hero-background/data-selector.service';
import { PhotoType } from '../hero-background/photo-type.enum';
import { HeroBackgroundService } from '../hero-background/hero-background.service';

@Component({
  selector: 'app-location-menu',
  templateUrl: './location-menu.component.html',
  styleUrls: ['./location-menu.component.scss'],
  animations: [
    trigger("expand", [
      state("on", style({width: "200px", height: 'inherit', opacity: 1, 'z-index': 7})), 
      state("off", style({width: "36px", height: '36px', opacity: '.4'})),
      transition("off => on", [animate("300ms linear")]),
      transition("on => off", [animate("300ms linear")])
    ])
  ]
})
export class LocationMenuComponent implements OnInit {
  @Output() locationChange = new EventEmitter<string>();
  state = 'off'
  constructor(public service: HeroBackgroundService) { }
  hover(on = false) {
    this.state = on ? 'on' : 'off';
  } 
  setSource(key: PhotoType) {
    this.service.setSource(key);
    this.locationChange.emit(key);
    this.state = 'off';
  }
  ngOnInit(): void {
    console.log(this.service.photoTypes)
    console.log(this.service.photoType?.key)
  }
} 