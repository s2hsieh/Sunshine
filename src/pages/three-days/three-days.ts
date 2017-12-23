import { ForecastDay } from './../../models/IForeCastDay';
import { DataService } from './../../services/data';
import { Component, OnInit } from '@angular/core';
import { Refresher, LoadingController, NavParams, Events } from 'ionic-angular';
import { Place } from '../../models/IPlace';
import { Feature, Observation, EVENT } from '../../providers/strings';
import { Pref } from '../../models/IPref';
import { PreferencesService } from '../../services/preferences';

@Component({
  templateUrl: 'three-days.html'
})
export class ThreeDays implements OnInit {

  forecasts: ForecastDay[];
  search: Place;
  pref: Pref;
  obs = Observation;

  constructor(private ps:PreferencesService, private event:Events, param: NavParams, private ds: DataService, private loadingCtrl: LoadingController) {
    this.search = param.data;
    // check if data was passed in
    if (!this.search.city) {
      this.search = undefined;
    }
  }

  ngOnInit() {
    this.ps.getPref().then(pref => {
      this.pref = pref;
      console.log(pref);
    });
    this.event.subscribe(EVENT.change, (pref: Pref) => {
      this.pref = pref;
      console.log(pref);
    });
    this.fetchData(null);
  }

  fetchData(refresher: Refresher) {
    if (!refresher) {
      var loader = this.loadingCtrl.create({
        content: "Plsease wait..."
      });
      loader.present();
    }
    this.ds.getForecast(Feature.three, this.search).then(res => {
      try {
        this.forecasts = <ForecastDay[]>res.json().forecast.simpleforecast.forecastday;
      } catch (error) {
        throw new Error("Failed to fetch data from API");
      }
      console.log(this.forecasts);
      refresher ? refresher.complete() : loader.dismiss();
    }).catch(err => {
      console.log(err);
      refresher ? refresher.complete() : loader.dismiss();
    });
  }
}
