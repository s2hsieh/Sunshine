import { Pipe, PipeTransform } from '@angular/core';
import { Degree } from '../../models/strings';

@Pipe({
  name: 'degSymbolPipe',
})
export class DegSymbolPipe implements PipeTransform {
  transform(degree:string) {
    switch (degree) {
      case Degree.metric:
        return String.fromCharCode(8451);
      case Degree.imperial:
        return String.fromCharCode(8457);
    }
  }
}
