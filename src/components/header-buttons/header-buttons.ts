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

  constructor(private appCtrl: App) { }

  ngOnInit() {
    if (this.search) {
      this.placeAdded = !this.showAdd();
    }
  }

  openSearch() {
    this.appCtrl.getRootNav().push("SearchPage");
  }

  openPref() {
    this.appCtrl.getRootNav().push("PrefPage", { pref: this.pref });
  }

  private showAdd() {
    return this.pref.locations.findIndex(v => v.toString() == this.search.toString()) < 0;
  }

  toggleAddState() {
    if (this.placeAdded) {
      this.pref.locations.filter(v => v.toString() !== this.search.toString());
      this.placeAdded = false;
    } else {
      this.pref.locations.push(this.search);
      this.placeAdded = true;
    }
  }

}
