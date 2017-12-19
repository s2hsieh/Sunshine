import { Pref } from './../../models/IPref';
import { Component } from '@angular/core';
import { Place } from '../../models/IPlace';
import { ViewController, NavParams, App, Events } from 'ionic-angular';
import { TabsPage } from '../../pages/tabs/tabs';
import { EVENT } from '../../providers/strings';

@Component({
  selector: 'location-select',
  templateUrl: 'location-select.html'
})
export class LocationSelectComponent {

  locations: Place[];
  search: Place;
  isNew: boolean;

  constructor(private viewCrl: ViewController, param: NavParams, appCrl: App, event: Events) {
    this.locations = param.data.locations;
    this.search = param.data.search;
    this.isNew = !param.data.isSaved;

    this.viewCrl.onDidDismiss((place: Place) => {
      if (place === null) {
        return;
      } else if (typeof place === "undefined") {
        appCrl.getRootNav().push(TabsPage);
      } else if (place.toString() != this.search.toString()) {
        appCrl.getRootNav().push(TabsPage, { place: place });
      }
    });

    // the constructor only runs once per page, hence must subscribe to preference changes
    event.subscribe(EVENT.change, (pref: Pref) => {
      this.locations = pref.locations;
    });
  }

  selected(place: Place) {
    this.viewCrl.dismiss(place)
  }

  isCurrent(place: Place) {
    return place.toString() == this.search.toString() && this.search.isGPS;
  }
}
