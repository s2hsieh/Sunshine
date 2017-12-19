import { Volume, Degree, Speed, Distance, Pressure, EVENT, IconSetList } from './../../providers/strings';
import { PreferencesService } from './../../services/preferences';
import { Component } from '@angular/core';
import { IonicPage, NavParams, Events } from 'ionic-angular';
import { Pref } from '../../models/IPref';
import { Place } from '../../models/IPlace';

@IonicPage()
@Component({
  selector: 'page-pref',
  templateUrl: 'pref.html',
})
export class PrefPage {

  edits: Pref;
  original: Pref;
  readonly iconSet: number[] = IconSetList;

  deg = Degree;
  vol = Volume;
  speed = Speed;
  dist = Distance;
  press = Pressure;


  constructor(private event: Events, private ps: PreferencesService, public navParams: NavParams) { }

  ionViewDidLoad() {
    this.original = this.navParams.get("pref");
    // clone origianl
    this.edits = Object.assign({}, this.original);
  }

  deleteLocation(place: Place){
    this.edits.locations = this.edits.locations.filter(p => p.toString() != place.toString());
  }

  ionViewWillLeave() {
    if (!Object.is(this.original, this.edits)) {
      this.ps.setPref(this.edits).then(r => {
        // destory original before sending changes
        this.original = this.edits;
        this.event.publish(EVENT.change, this.edits);
        console.log("saved preferences");
      });
    }
  }

}
