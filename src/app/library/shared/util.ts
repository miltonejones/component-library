export function randomize(collection: Array<any>): Array<any> {
    return collection.map(f => {
      return {f, b: Math.random() * collection.length};
    })
      .sort((a, b) => a.b > b.b ? 1 : -1).map(f => f.f);
  }
  

export function createElement(name: string, styles: {[p: string]: any}, attrs?: Array<{ name: string, value: string }>) {
  const element = setStyle(document.createElement(name), styles);
  if (attrs) {
    attrs.map((attr: any) => element.setAttribute(attr.name, attr.value));
  }
  return element;
} 

export function setStyle(element: HTMLElement, styles: {[p: string]: any}): HTMLElement {
  for (const style in styles) {
    if (styles.hasOwnProperty(style)) {
      element.style[style as any] = styles[style];
    }
  }
  return element;
}
export function numberFromStyle(dim: string): number {
  const rex = /([0-9\.]+)px/;
  const re = rex.exec(dim);
  if (re) {
    return parseFloat(re[1]);
  }
  return -1;
}

export function createRandomKey(): string {
  return btoa((Math.random() * 10000000).toString()).replace(/=/g, '');
}

export function generateProgress(color = '#f8b26a'): string {
  const output = document.createElement('canvas');
  ((canvas) => {
    canvas.width = 10;
    canvas.height = 10;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.rect(0, 0, 10, 10);
      ctx.fillStyle = color;
      ctx.fill();
    }
  })(output);
  return output.toDataURL();
}

export function generateKey(Title: string): string {
  if (!(Title && Title.replace)) {
    return '';
  }
  return Title.replace(/[\.\s-\/]/g, '').toLowerCase().trim().replace('the', '');
}
