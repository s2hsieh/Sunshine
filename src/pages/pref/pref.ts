import { Volume, Degree, Speed, Distance, Pressure, EVENT } from './../../providers/strings';
import { PreferencesService } from './../../services/preferences';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Pref } from '../../models/IPref';

@IonicPage()
@Component({
  selector: 'page-pref',
  templateUrl: 'pref.html',
})
export class PrefPage {

  edits: Pref;
  original: Pref;

  deg = Degree;
  vol = Volume;
  speed = Speed;
  dist = Distance;
  press = Pressure;


  constructor(private event: Events, private ps: PreferencesService, public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    this.original = this.navParams.get("pref");
    // clone origianl
    this.edits = Object.assign({}, this.original);
  }

  ionViewWillLeave() {
    if (!Object.is(this.original, this.edits)) {
      this.ps.setPref(this.edits).then(r => {
        this.original = this.edits;
        this.event.publish(EVENT.change, this.edits);
        console.log("saved preferences");
      });
    }
  }

}
