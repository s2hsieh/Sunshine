import { PreferencesService } from './../../services/preferences';
import { Place } from './../../models/IPlace';
import { Pref } from './../../models/IPref';
import { Component, Input, OnInit } from '@angular/core';
import { App } from 'ionic-angular/components/app/app';
import { TabsPage } from '../../pages/tabs/tabs';

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
    this.pref.locations = this.pref.locations.map(v => new Place(v.cord, v.city, v.provOrState, v.country));
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

  openForecast(place: string) {
    // this.appCtrl.getRootNav().setRoot(TabsPage, { place: place });
  }

  private isSaved() {
    return this.pref.locations.findIndex(v => v.toString() == this.search.toString()) >= 0;
  }

  toggleAddState() {
    if (this.placeAdded) {
      // remove place
      this.pref.locations = this.pref.locations.filter(v => v.toString() !== this.search.toString());
    } else {
      // add place
      this.pref.locations.push(this.search);
    }
    this.ps.setPref(this.pref).then(p => {
      this.placeAdded = !this.placeAdded;
    });
  }

  compare(p1: Place, p2: Place) {
    return p1 && p2 ? p1.toString() == p2.toString() : p1 == p2;
  }

}
