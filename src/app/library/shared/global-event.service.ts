import { EventEmitter, Injectable } from '@angular/core';
import { CollapseEventData } from './viewmodel/collapse-event-data';
import { CollapseEvent } from './viewmodel/collapse-event.enum';

@Injectable({
  providedIn: 'root'
})
export class GlobalEventService {
  elementCollapse = new EventEmitter<CollapseEventData>();
  constructor() { }
  expand(source: string) { this.elementCollapse.emit({source, event: CollapseEvent.EXPAND}); }
  collapse(source: string) { this.elementCollapse.emit({source, event: CollapseEvent.COLLAPSE}); }
}
