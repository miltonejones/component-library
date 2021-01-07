import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild
} from "@angular/core";
import { Observable } from "rxjs";

const TICK_WIDTH = 24;
const TICK_COUNT = 28;
const SECOND_OFFSET = 7;
@Component({
  selector: 'app-racing-clock',
  templateUrl: './racing-clock.component.html',
  styleUrls: ['./racing-clock.component.scss']
})
export class RacingClockComponent implements OnInit {
  @Output() musicSelected = new EventEmitter<void>()
  am = false;
  dots: Tick[] = [];
  timePoint: TimePoint = {} as TimePoint;
  datePoint: DatePoint = {} as DatePoint;
  maxLeft = 0;
  pastLeft = new EventEmitter<Tick>();
  url = racingStripe();
  constructor(private ch: ChangeDetectorRef) {}

  display(f: TimePoint) {
    this.timePoint = f;
    this.am = parseInt(f.h, 10) < 12;
    this.datePoint = {
      day: dayOf(new Date().getDay()),
      date: new Date().getDate().toString()
    };
  }

  go() {
    this.dots.map(d => d.go());
    setTimeout(() => this.go(), 1000);
  }

  ngOnInit() {
    this.tick().subscribe(f => this.display(f));
    this.dots = [];
    let actual = Math.max(new Date().getSeconds() - SECOND_OFFSET, 0);
    for (let i = 0; i < TICK_COUNT; i++) {
      const value = actual % 60;
      const second = value < 10 ? `0${value}` : value.toString();
      this.dots.push(new Tick(this.pastLeft, second, i * TICK_WIDTH));
      this.maxLeft = actual;
      actual++;
    }
    this.pastLeft.subscribe((tick: Tick) => {
      // const value = ++this.maxLeft;
      // const actual = value % 60;
      tick.trans = "left 0s";
      tick.left = (TICK_COUNT - 2) * TICK_WIDTH;
      // tick.value = actual < 10 ? `0${actual}` : actual.toString();
    });
    this.go();
  }
  tick(): Observable<TimePoint> {
    return new Observable<TimePoint>(observer => {
      const run = () => {
        const d = new Date();
        let hh = (d.getHours() % 12)
        const h = d.getHours().toString();
        let m = d.getMinutes().toString();
        const s = d.getSeconds().toString();
        if (parseInt(m, 10) < 10) {
          m = `0${m}`;
        }
        if (hh < 1) hh = 12;
        observer.next({ h, m, s, hh });
        window.requestAnimationFrame(run);
      };
      window.requestAnimationFrame(run);
    });
  }
}

class Tick {
  left = 0;
  value = "";
  trans = "left 1s";
  active = false;
  pastLeft = new EventEmitter<Tick>();
  constructor(tick: EventEmitter<Tick>, v = "", l = 0) {
    this.pastLeft = tick;
    this.value = v;
    this.left = l;
  }
  val() {
    const index = Math.floor(this.left / TICK_WIDTH) - SECOND_OFFSET;
    const second = Math.max(0, (new Date().getSeconds() + index) % 60);
    return second < 10 ? `0${second}` : second.toString();
  }
  go() {
    const where = (SECOND_OFFSET + 1) * TICK_WIDTH;
    const min = where - 10;
    const max = where + 10;
    this.trans = "all 1s";
    this.left -= TICK_WIDTH;
    this.value = this.val();
    if (this.left < -TICK_WIDTH) {
      this.pastLeft.emit(this);
    }
    this.active = this.left > min && this.left < max;
  }
}

export interface TimePoint {
  hh: number;
  h: string;
  m: string;
  s: string;
}

export interface DatePoint {
  day: string;
  date: string;
}

export function racingStripe() {
  const cv = document.createElement("canvas");
  cv.width = 570;
  cv.height = 200;
  var ctx = cv.getContext("2d");
  const x1 = cv.width * 0.65;
  const x2 = cv.width * 0.4;
  const y2 = cv.height + 10;
  if (ctx) {
    ctx.lineWidth = 16;
    ctx.strokeStyle = "#ffaaaa";
    ctx.beginPath();
    ctx.moveTo(x1, -10);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    ctx.strokeStyle = "#999999";
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(x1 + 20, -10);
    ctx.lineTo(x2 + 20, y2);
    ctx.stroke();
  }
  return cv.toDataURL();
}

export function dayOf(i: number) {
  return ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][i];
}
