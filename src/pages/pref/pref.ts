import { Volume, Degree, Speed, Distance, Pressure } from './../../models/strings';
import { PreferencesService } from './../../services/preferences';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Units } from '../../models/IPref';

@IonicPage()
@Component({
  selector: 'page-pref',
  templateUrl: 'pref.html',
})
export class PrefPage {

  units:Units;
  
  deg = Degree;
  vol = Volume;
  speed = Speed;
  dist = Distance;
  press = Pressure;

  
  constructor(private ps:PreferencesService, public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidEnter(){
    this.units = this.navParams.data;
  }

  async ionViewWillLeave(){
    await this.ps.setPref(this.units).then(r => {
      console.log("saved preferences");
    });
  }
}
