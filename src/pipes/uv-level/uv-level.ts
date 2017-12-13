import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uvLevel',
})
export class UvLevelPipe implements PipeTransform {
  transform(value: string) {
    let level;
    try {
      level = Number.parseInt(value);
    } catch (err) {
      return "no data"
    }
    if (level >= 11) {
      return "Extreme";
    } else if (level >= 8) {
      return "Very High";
    } else if (level >= 6) {
      return "High";
    } else if (level >= 3) {
      return "Moderate";
    } else if (level >= 0) {
      return "Low";
    } else {
      return "no data";
    }
  }
}
