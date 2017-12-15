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
  adding = false;

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
    // v.toStirng() uses the one inherited form Object not  the one overiten by Place
    return this.pref.locations.findIndex(v => [v.city, v.provOrState, v.country].join(", ") == this.search.toString()) >= 0;
  }

  toggleAddState() {
    this.adding = true;
    if (this.placeAdded) {
      // remove place
      this.pref.locations = this.pref.locations.filter(v => v.toString() !== this.search.toString());
    } else {
      // add place
      this.pref.locations.push(this.search);
    }
    this.ps.setPref(this.pref).then(p => {
      this.placeAdded = !this.placeAdded;
      this.adding = false;
    })
  }

}
