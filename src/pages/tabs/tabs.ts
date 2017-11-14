import { Component } from '@angular/core';

import { ThreeDays } from '../three-days/three-days';
import { TenDays } from '../ten-days/ten-days';
import { Current } from '../current/current';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = Current;
  tab2Root = ThreeDays;
  tab3Root = TenDays;

  constructor() {

  }
}
