import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { PhotoDatum } from './photo-datum';

@Component({
  selector: 'app-photo-credit',
  templateUrl: './photo-credit.component.html',
  styleUrls: ['./photo-credit.component.scss'],
  animations: [
    trigger("rotate", [
      state("turn", style({transform: "rotateY(360deg)"})),
      state("turned", style({transform: "rotateY(0deg)"})),
      transition("* => *", [animate("900ms linear")])
    ])
  ]
})
export class PhotoCreditComponent implements OnInit {

  @Input() selected: PhotoDatum = {} as PhotoDatum;
  turn = 'turned'
  constructor() { }

  ngOnInit(): void {
  }

}
