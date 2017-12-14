import { Component, Input } from '@angular/core';
import { ForecastDay } from '../../models/IForeCastDay';
import { Pref } from '../../models/IPref';
import { Degree, Speed, Volume } from '../../providers/strings';

@Component({
  selector: 'forecast-list',
  templateUrl: 'forecast-list.html'
})
export class ForecastListComponent {

  @Input() forecasts: ForecastDay[];
  @Input() pref: Pref;

  deg = Degree;
  speed = Speed;
  vol = Volume;

  constructor() {}
}
