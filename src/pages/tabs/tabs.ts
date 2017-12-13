import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { ThreeDays } from '../three-days/three-days';
import { TenDays } from '../ten-days/ten-days';
import { Current } from '../current/current';
import { Place } from '../../models/IPlace';
import { PreferencesService } from '../../services/preferences';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  place: Place;

  tab1Root = Current;
  tab2Root = ThreeDays;
  tab3Root = TenDays;

  constructor(params: NavParams, ps:PreferencesService) {
    this.place = params.get("place");
    ps.initialize();
  }
}
