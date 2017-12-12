import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the UvLevelPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'uvLevel',
})
export class UvLevelPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string) {
    switch (value) {
      case "0":
      case "1":
      case "2":
        return "Low";
      case "3":
      case "4":
      case "5":
        return "Moderate";
      case "6":
      case "7":
        return "High";
      case "8":
      case "9":
      case "10":
        return "Very High";
      case "11":
      default:
        return "Extreme";
    }
  }
}
