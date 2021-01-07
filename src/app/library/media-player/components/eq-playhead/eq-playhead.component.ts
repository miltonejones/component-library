import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EqDisplayType } from 'src/app/library/eq-label/constants/eq-display-type.enum';
import { Mediafile } from '../../viewmodel/mediafile';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { PlayheadCommand } from './playhead-command.enum';

export const DROP_DELAY = 600;
@Component({
  selector: '[app-eq-playhead]',
  templateUrl: './eq-playhead.component.html',
  styleUrls: ['./eq-playhead.component.scss'],
  animations: [
    trigger('slot', [
      state('on', style({ transform: 'translateY(0px)' })),
      state('off', style({ transform: 'translateY(64px)' })),
      transition('* <=> *', [animate(`${DROP_DELAY}ms ease-out`)]) 
    ])
  ]
})
export class EqPlayheadComponent implements OnInit {
  @Input() paused = false;
  @Input('app-eq-playhead') file: Mediafile = {} as Mediafile;
  @Input() progress = -1;
  @Input() collapsed = false;
  @Input() drop = 'off';
  @Output() command = new EventEmitter<PlayheadCommand>();
  isBar = true;
  constructor() { }

  ngOnInit(): void {
  }

  get barType(): EqDisplayType {
    return this.isBar ? EqDisplayType.CSS : EqDisplayType.LINE;
  }
  seekTo(i: any) { }
  next() { this.command.emit(PlayheadCommand.NEXT) }
  pause() { this.command.emit(PlayheadCommand.PLAY) }
  collapse() { this.command.emit(PlayheadCommand.COLLAPSE) }
}
