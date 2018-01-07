import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'properNoun',
})
export class ProperNounPipe implements PipeTransform {
  transform(str: string) {
    let words = str.split(" ");
    return words.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(" ");
  }
}
