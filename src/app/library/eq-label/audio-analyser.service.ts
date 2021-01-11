import { Injectable } from "@angular/core";
import { Observable } from "rxjs"; 
import { EqDisplayType } from "./constants/eq-display-type.enum";
import { drawBarGraph, statsBarGraph } from "./functions/app.bar-graph.function";
import { drawLineGraph } from "./functions/app.line-graph.function";

@Injectable()
export class AudioAnalyserService {
  private analyser: AnalyserNode = {} as AnalyserNode;
  private context = new AudioContext();
  observers: AudioAnalyserServiceObserverCollection = {};
  constructor() {}
  get state(): AudioContextState {
    return this.context.state;
  }
  configure(audio: HTMLAudioElement) {
    audio.crossOrigin = "anonymous";
    audio.addEventListener("error", () => alert("An error occured"));
  }
  resume(): void {
    this.context.resume();
  }
  attach(audio: HTMLAudioElement, hue?: string): void {
    this.configure(audio);
    this.analyser = this.context.createAnalyser();
    const source = this.context.createMediaElementSource(audio);
    source.connect(this.analyser);
    this.analyser.connect(this.context.destination);
    this.observers = {
      [EqDisplayType.LINE]: drawLineGraph(this.analyser, audio, hue),
      [EqDisplayType.BAR]: drawBarGraph(this.analyser, audio, hue),
      [EqDisplayType.CSS]: statsBarGraph(this.analyser, audio)
    };
    console.log("attached!", hue, this.context.state);
  }
}
export interface AudioAnalyserServiceObserverCollection {
  [propName: string]: Observable<string>;
}