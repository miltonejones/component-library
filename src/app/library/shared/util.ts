export function randomize(collection: Array<any>): Array<any> {
    return collection.map(f => {
      return {f, b: Math.random() * collection.length};
    })
      .sort((a, b) => a.b > b.b ? 1 : -1).map(f => f.f);
  }
  