import { Place } from './../../models/IPlace';
import { CurrentObservation } from './../../models/ICurrentObservation';
import { DataService } from './../../services/data';
import { Component, OnInit } from '@angular/core';
import { LoadingController, Refresher, NavParams, Events } from 'ionic-angular';
import { Pref } from '../../models/IPref';
import { Feature, Degree, Volume, Speed, Pressure, Distance, Observation, EVENT } from '../../providers/strings';

@Component({
  templateUrl: 'current.html'
})
export class Current implements OnInit {

  forecast: CurrentObservation;
  private search: Place;
  pref: Pref;
  obs = Observation;

  ngOnInit() {
    this.event.subscribe(EVENT.init, (pref) => {
      this.pref = pref;
      console.log(pref);
    });
    this.event.subscribe(EVENT.change, (pref) => {
      this.pref = pref;
      console.log(pref);
    });
    this.fetchData(null);
  }

  constructor(private event:Events, param: NavParams, private ds: DataService, private loadingCtrl: LoadingController) {
    this.search = param.data;
    // check if data was passed in
    if (!this.search.city) {
      this.search = undefined;
    }
  }

  getObservation(obs: number) {
    switch (obs) {
      case Observation.temp:
        return this.pref.degree == Degree.metric ? this.forecast.temp_c : this.forecast.temp_f;
      case Observation.precip:
        return this.pref.volume == Volume.metric ? this.forecast.precip_1hr_metric : this.forecast.precip_1hr_in;
      case Observation.wind:
        return this.pref.speed == Speed.metric ? this.forecast.wind_kph : this.forecast.wind_mph;
      case Observation.pressure:
        return this.pref.pressure == Pressure.metric ? this.forecast.pressure_mb : this.forecast.pressure_in;
      case Observation.visibility:
        return this.pref.distance == Distance.metric ? this.forecast.visibility_km : this.forecast.visibility_mi;
    }
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
