import { Units } from './../../models/IPref';
import { Component, Input } from '@angular/core';
import { App } from 'ionic-angular/components/app/app';

@Component({
  selector: 'header-buttons',
  templateUrl: 'header-buttons.html'
})
export class HeaderButtonsComponent {

  @Input() pref: Units;

  constructor(private appCtrl: App) { }

  openSearch() {
    this.appCtrl.getRootNav().push("SearchPage");
  }

  openPref() {
    this.appCtrl.getRootNav().push("PrefPage", { units: this.pref });
  }

}
