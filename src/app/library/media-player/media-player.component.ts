import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MediaPlayerService } from './media-player.service';
import { Genre } from './viewmodel/genre';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { Mediafile } from './viewmodel/mediafile';
import { EqDisplayType } from '../eq-label/constants/eq-display-type.enum';
import { AudioAnalyserService } from '../eq-label/audio-analyser.service';
import { PlayheadCommand } from './components/eq-playhead/playhead-command.enum';
import { GlobalEventService } from '../shared/global-event.service';
import { CollapseEvent } from '../shared/viewmodel/collapse-event.enum';
import { CollapseEventData } from '../shared/viewmodel/collapse-event-data';
import { AudioContextState } from '../eq-label/audio-context-state.enum';

export const SONG_HOST = 'https://s3.amazonaws.com/box.import/';
@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.scss'],
  animations: [
    trigger('expand', [
      state('on', style({ height: '270px', display: 'block' })),
      state('off', style({ height: '24px', display: 'block' })),
      state('gone', style({ left: '-100%', height: '0' })),
      transition('* <=> *', [animate('300ms ease-out')])
    ]),
    trigger('scoot', [
      state('on', style({ top: '180px' })),
      state('off', style({ top: '10px' })),
      transition('on => off', [animate('300ms ease-out')]),
      transition('off => on', [animate('300ms ease-out')])
    ])
  ]
})
export class MediaPlayerComponent implements OnInit, AfterViewInit {
  @Input() musicSelected = new EventEmitter<void>();
  genres: Genre[] = [];
  player$: HTMLAudioElement = {} as HTMLAudioElement;
  queue: Mediafile[] = [];
  files: Mediafile[] = [];
  items: Mediafile[] = [];
  file: Mediafile = {} as Mediafile;
  bar: EqDisplayType = EqDisplayType.CSS;
  isBar = true;
  collapsed = false;
  listMode = false;
  dropped = 'off';
  filtered = !1;
  audioURL = '';
  drop = 'off'
  param = '';
  index = -1;
  progress = 0;
  duration = 0;
  currentTime = 0;
  timer = -1;
  @ViewChild("stream") set playerRef(ref: ElementRef<HTMLAudioElement>) {
    this.player$ = ref.nativeElement;
  }
  constructor(private service: MediaPlayerService, private connect: AudioAnalyserService, private ch: ChangeDetectorRef, private gs: GlobalEventService) { }
  ngOnInit(): void {
    const mode = localStorage['media-player-mode'];
    this.listMode = mode === 'list';
    this.musicSelected.subscribe(this.init.bind(this));
    this.gs.elementCollapse.subscribe((data: CollapseEventData) => {
      this.dropped = data.source === 'box' && data.event === CollapseEvent.EXPAND ? 'on' : 'off'
    });
  }
  resume(): void {
    this.connect.resume();
  }
  get connected(): boolean {
    return this.connect.state === AudioContextState.RUNNING;
  }
  get barType(): EqDisplayType {
    return this.isBar ? EqDisplayType.CSS : EqDisplayType.LINE;
  }
  ngAfterViewInit() {
    this.connect.attach(this.player$, 'black');
    this.player$.addEventListener('ended', () => this.next());
    this.player$.addEventListener('timeupdate', () => this.setProgress(this.player$.currentTime));
    this.player$.addEventListener('loadeddata', () => {
      this.drop = 'on';
    });
  }
  seekTo(e: any) { console.log(e) }
  setProgress(currentTime: number) {
    if (currentTime < this.currentTime || currentTime > this.currentTime + 1) {
      this.currentTime = currentTime;
      this.progress = (this.currentTime / this.player$.duration) * 100;
    }
    this.ch.detectChanges();
  }
  init() {
    if (this.genres.length) {
      this.genres = [];
      this.gs.collapse('player');  
      return;
    }
    this.beginLoad();
  }
  beginLoad() {
    const request = this.listMode
      ? this.service.getPlaylists()
      : this.service.getGenres()
    const tmp = request.subscribe((data: any[]) => {
      console.log({ data })
      if (data.length) {
        const sample = data[0];
        this.genres = sample.hasOwnProperty('Count')
          ? data.filter(f => f.Count > 49)
          : data;
        this.genres.map(g => g.state = 'off');
        this.gs.expand('player');
      }
      tmp.unsubscribe();
    });
  }
  unfilter() {
    this.files = this.items.slice(0);
    this.param = '';
    this.filtered = !1;
  }
  filter(str: string) {
    this.files = this.items.filter(f => f.Title.toUpperCase().indexOf(str.toUpperCase()) > -1);
    this.filtered = !0;
  }
  get genreOn(): boolean {
    return !!this.genres.filter(g => g.state === 'on').length
  }
  compare(a: any, b: any) {
    if (this.listMode) {
      return a.listKey === b.listKey;
    }
    return a.genreKey === b.genreKey;
  }
  expand(g: Genre): void {
    const on = g.state === 'on';
    this.genres.map(k => {
      if (!this.compare(g, k)) {
        k.state = on ? 'off' : 'gone';
      }
    });
    g.state = on ? 'off' : 'on';
  }
  load(g: any): void {
    const request = this.listMode
      ? this.service.getPlaylist(g.listKey)
      : this.service.getGenre(g.genreKey)
    request.subscribe((files: Mediafile[]) => {
      this.items = files;
      this.files = this.items.slice(0);
      this.expand(g);
    });
  }
  setSourceIndex(i: number) {
    this.queue = this.files.slice(0);
    this.index = i;
    this.file = this.queue[this.index];
    this.collapsed = true;
    this.setSource(this.file.Key);
  }
  next() {
    this.index++;
    this.drop = 'off';
    this.player$.pause();
    if (this.index < this.queue.length) {
      window.clearTimeout(this.timer);
      this.timer = window.setTimeout(() => this.setSourceIndex(this.index), 699);
    }
  }
  play() {
    const audioElement = this.player$;
    audioElement.src = this.audioURL;
    setTimeout(() => this.ch.detectChanges(), 1999);
    this.gs.collapse('player');
  }
  setSource(o: string) {
    const audioURL = `${SONG_HOST}${o}`.replace('#', '%23').replace(/\+/g, '%2B');
    this.audioURL = audioURL; //`${SONG_HOST}${escape(o)}`;
    localStorage["audioURL"] = this.audioURL;
    window.scrollTo(0, 0);
    this.play();
  }
  toggleSource() {
    this.listMode = !this.listMode;
    localStorage['media-player-mode'] = this.listMode ? 'list' : 'genre';
    this.init();
  }
  doCommand(command: PlayheadCommand): void {
    switch (command) {
      case PlayheadCommand.PLAY:
        if (this.player$.paused) {
          this.player$.play();
          return;
        }
        this.player$.pause();
        break;
      case PlayheadCommand.NEXT:
        this.next();
        break;
      case PlayheadCommand.COLLAPSE:
        this.collapsed = !this.collapsed;
        this.gs.elementCollapse.emit({
          source: 'player',
          event: this.collapsed ? CollapseEvent.COLLAPSE : CollapseEvent.EXPAND
        });
        break;
      default:
      // do nothing
    }
    setTimeout(() => this.ch.detectChanges(), 999);
  }
}
