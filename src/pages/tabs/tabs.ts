import { Component } from '@angular/core';
import { NavParams, Events } from 'ionic-angular';

import { ThreeDays } from '../three-days/three-days';
import { TenDays } from '../ten-days/ten-days';
import { Current } from '../current/current';
import { Place } from '../../models/IPlace';
import { PreferencesService } from '../../services/preferences';
import { EVENT } from '../../providers/strings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  place: Place;

  tab1Root = Current;
  tab2Root = ThreeDays;
  tab3Root = TenDays;

  constructor(event:Events, params: NavParams, ps:PreferencesService) {
    this.place = params.get("place");
    ps.initialize();
    event.subscribe(EVENT.gps, place => this.place = place)
  }
}
