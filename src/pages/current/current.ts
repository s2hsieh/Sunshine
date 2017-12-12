import { PreferencesService } from './../../services/preferences';
import { Place } from './../../models/IPlace';
import { CurrentObservation } from './../../models/ICurrentObservation';
import { DataService } from './../../services/data';
import { Component, OnInit } from '@angular/core';
import { App, NavController, LoadingController, Refresher, NavParams } from 'ionic-angular';
import { Units } from '../../models/IPref';
import { Feature, Degree, Volume, Speed, Pressure, Distance, Observation } from '../../models/strings';

@Component({
  templateUrl: 'current.html'
})
export class Current implements OnInit {

  forecast: CurrentObservation;
  private search: Place;
  units: Units;
  obs = Observation;

  ngOnInit() {
    this.fetchData(null);
  }

  constructor(private ps: PreferencesService, param: NavParams, public navCtrl: NavController, private appCtrl: App, private ds: DataService, private loadingCtrl: LoadingController) {
    this.search = param.data;
    // check if data was passed in
    if (!this.search.city) {
      this.search = undefined;
    }
  }

  ionViewDidEnter() {
    this.ps.getPref().then(units => {
      this.units = units;
      console.log("fetched preferences");
    })
  }

  getObservation(obs: number) {
    switch (obs) {
      case Observation.temp:
        return this.units.degree == Degree.metric ? this.forecast.temp_c : this.forecast.temp_f;
      case Observation.precip:
        return this.units.volume == Volume.metric ? this.forecast.precip_1hr_metric : this.forecast.precip_1hr_in;
      case Observation.wind:
        return this.units.speed == Speed.metric ? this.forecast.wind_kph : this.forecast.wind_mph;
      case Observation.pressure:
        return this.units.pressure == Pressure.metric ? this.forecast.pressure_mb : this.forecast.pressure_in;
      case Observation.visibility:
        return this.units.distance == Distance.metric ? this.forecast.visibility_km : this.forecast.visibility_mi;
    }
  }

  getDegree(degree:string){
    switch (degree) {
      case Degree.metric:
        return String.fromCharCode(8451);
      case Degree.imperial:
        return String.fromCharCode(8457);
    }
  }

  openSearch() {
    this.appCtrl.getRootNav().push("SearchPage");
  }

  openPref() {
    this.appCtrl.getRootNav().push("PrefPage", this.units);
  }

  private fetchData(refresher: Refresher) {
    if (!refresher) {
      var loader = this.loadingCtrl.create({
        content: "Plsease wait..."
      });
      loader.present();
    }
    this.ds.getForecast(Feature.now, this.search).then(res => {
      try {
        this.forecast = <CurrentObservation>res.json().current_observation;
      } catch (error) {
        throw new Error("Failed to fetch data from API");
      }
      console.log(this.forecast);
      refresher ? refresher.complete() : loader.dismiss();
    }).catch(err => {
      console.log(err);
      refresher ? refresher.complete() : loader.dismiss();
    });
  }
}
