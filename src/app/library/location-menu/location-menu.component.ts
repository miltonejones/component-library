import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

@Component({
  selector: 'app-location-menu',
  templateUrl: './location-menu.component.html',
  styleUrls: ['./location-menu.component.scss'],
  animations: [
    trigger("expand", [
      state("on", style({width: "200px", height: '300px'})),
      state("off", style({width: "36px", height: '36px'})),
      transition("off => on", [animate("300ms linear", keyframes([
        style({width: '200px'}),
        style({height: '300px'})
      ]))]),
      transition("on => off", [animate("300ms linear")])
    ])
  ]
})
export class LocationMenuComponent implements OnInit {

  state = 'off'
  constructor() { }
  hover(on = false) {
    this.state = on ? 'on' : 'off';
  }

  ngOnInit(): void {
  }

} 