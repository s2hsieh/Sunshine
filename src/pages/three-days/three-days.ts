import { ForecastDay } from './../../models/IForeCastDay';
import { DataService } from './../../services/data';
import { Component, OnInit } from '@angular/core';
import { NavController, Refresher, LoadingController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'three-days.html'
})
export class ThreeDays implements OnInit {

  forecasts: ForecastDay[];
  private search: string;

  ngOnInit() {
    this.fetchData(null);
  }

  constructor(public navCtrl: NavController, param: NavParams, private data: DataService, private loadingCtrl: LoadingController) {
    if (typeof param.data == 'string') {
      this.search = param.data;
    }
  }

  fetchData(refresher: Refresher) {
    if (!refresher) {
      var loader = this.loadingCtrl.create({
        content: "Plsease wait..."
      });
      loader.present();
    }
    this.data.getForecast("forecast", this.search).then(res => {
      this.forecasts = <ForecastDay[]>res.json().forecast.simpleforecast.forecastday;
      console.log(this.forecasts);
      if (!this.forecasts) {
        throw new Error("Failed to fetch data from API");
      }
      refresher ? refresher.complete() : loader.dismiss();
    }).catch(err => {
      console.log(err);
      refresher ? refresher.complete() : loader.dismiss();
    });
  }
}
