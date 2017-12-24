import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'properNoun',
})
export class ProperNounPipe implements PipeTransform {
  transform(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
