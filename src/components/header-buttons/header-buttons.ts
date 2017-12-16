import { PreferencesService } from './../../services/preferences';
import { Place } from './../../models/IPlace';
import { Pref } from './../../models/IPref';
import { Component, Input, OnInit } from '@angular/core';
import { App } from 'ionic-angular/components/app/app';

@Component({
  selector: 'header-buttons',
  templateUrl: 'header-buttons.html'
})
export class HeaderButtonsComponent implements OnInit {

  @Input() pref: Pref;
  @Input() search: Place;
  placeAdded: boolean;

  constructor(private appCtrl: App, private ps: PreferencesService) { }

  ngOnInit() {
    if (this.search) {
      this.placeAdded = this.isSaved();
    }
  }

  openSearch() {
    this.appCtrl.getRootNav().push("SearchPage");
  }

  openPref() {
    this.appCtrl.getRootNav().push("PrefPage", { pref: this.pref });
  }

  private isSaved() {
    return this.pref.locations.findIndex(v => this.overrideToString(v) == this.search.toString()) >= 0;
  }

  toggleAddState() {
    if (this.placeAdded) {
      // remove place
      this.pref.locations = this.pref.locations.filter(v => this.overrideToString(v) !== this.search.toString());
    } else {
      // add place
      this.pref.locations.push(this.search);
    }
    this.ps.setPref(this.pref).then(p => {
      this.placeAdded = !this.placeAdded;
    });
  }

  // v.toStirng() uses the one inherited form Object not  the one overriten in Place
  private overrideToString(v: Place) {
    return [v.city, v.provOrState, v.country].join(", ");
  }

}
