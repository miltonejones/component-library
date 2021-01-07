import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[filter-hilite]'
})
export class FilterHighlightDirective {


  @Input('filter-hilite') filterParam = '';
  @Input('start-value') startValue = '';
  cache = '';
  private el: HTMLElement;
  // registrar: RegistrationService;
  constructor(el: ElementRef) {
    this.el = el.nativeElement;
    // this.registrar = rt;
  }

  ngAfterViewChecked(): void {
    this.check();
  }

  check() {
    const cache = JSON.stringify({ p: this.startValue, s: this.filterParam });
    if (this.cache !== cache) {
      this.start();
      this.cache = cache;
    }
  }

  test(): boolean {
    return !!(this.filterParam.length && this.startValue.toLowerCase()
      .indexOf(this.filterParam.toLowerCase()) > -1);
  }

  start(): void {
    if (this.test()) {
      const rex = new RegExp(`(${this.filterParam})`, 'gi');
      const re = rex.exec(this.startValue);
      if (re) {
        this.el.innerHTML = this.startValue.replace(rex, `<span style="color:red">${re[1]}</span>`);
      }
      return;
    }
    console.log(this.startValue)
    this.el.innerText = this.startValue;
  }
  ngOnDestroy(): void {
    // this.registrar.unregister(this);
  }
  ngOnInit(): void {
    this.check();
    // this.instanceId = createRandomKey();
    // this.registrar.register(this, { p: this.startValue, s: this.filterParam });
  }

}
