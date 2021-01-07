import { EventEmitter, Injectable } from '@angular/core';
import { CollapseEvent } from './viewmodel/collapse-event.enum';

@Injectable({
  providedIn: 'root'
})
export class GlobalEventService {
  elementCollapse = new EventEmitter<CollapseEvent>();
  constructor() { }
  expand() { this.elementCollapse.emit(CollapseEvent.EXPAND); }
  collapse() { this.elementCollapse.emit(CollapseEvent.COLLAPSE); }
}
