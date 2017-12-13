import { Component, Input } from '@angular/core';
import { ForecastDay } from '../../models/IForeCastDay';

@Component({
  selector: 'forecast-list',
  templateUrl: 'forecast-list.html'
})
export class ForecastListComponent {

  @Input() forecasts: ForecastDay[];

  constructor() {}

}
