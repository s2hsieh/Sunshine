import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uvLevel',
})
export class UvLevelPipe implements PipeTransform {
  transform(value: string) {
    let level: number;
    let result: string;
    try {
      level = Number.parseInt(value);
      if (level >= 11) {
        result = "Extreme";
      } else if (level >= 8) {
        result = "Very High";
      } else if (level >= 6) {
        result = "High";
      } else if (level >= 3) {
        result = "Moderate";
      } else if (level >= 0) {
        result = "Low";
      } else {
        result = "no data";
      }
    } catch (err) {
      result = "no data"
    }
    
    return result;
  }
}
