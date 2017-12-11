import { PreferencesService } from './../../services/preferences';
import { Place } from './../../models/IPlace';
import { CurrentObservation } from './../../models/ICurrentObservation';
import { DataService } from './../../services/data';
import { Component, OnInit } from '@angular/core';
import { App, NavController, LoadingController, Refresher, NavParams } from 'ionic-angular';
import { Units } from '../../models/IPref';

@Component({
  templateUrl: 'current.html'
})
export class Current implements OnInit {

  forecast: CurrentObservation;
  private search: Place;
  units: Units;

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

  getObservation(observation: string) {
    switch (observation) {
      case "temp":
        return this.units.degree == "c" ? this.forecast.temp_c : this.forecast.temp_f;
      case "precip":
        return this.units.volume == "mm" ? this.forecast.precip_1hr_metric : this.forecast.precip_1hr_in;
      case "wind":
        return this.units.speed == "km/h" ? this.forecast.wind_kph : this.forecast.wind_mph;
      case "pressure":
        return this.units.pressure == "mb" ? this.forecast.pressure_mb : this.forecast.pressure_mb;
      case "visibility":
        return this.units.distance == "km" ? this.forecast.visibility_km : this.forecast.visibility_mi;
    }
  }

  openSearch() {
    this.appCtrl.getRootNav().push("SearchPage", );
  }

  private fetchData(refresher: Refresher) {
    if (!refresher) {
      var loader = this.loadingCtrl.create({
        content: "Plsease wait..."
      });
      loader.present();
    }
    this.ds.getForecast("conditions", this.search).then(res => {
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
