import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const limit = args || 50;
    if (value?.length > limit) {
      return value.substr(0, limit) + '...';
    }
    return value;
  }
}