import { Component, OnInit } from '@angular/core';
import { NavController, Refresher, NavParams, LoadingController } from 'ionic-angular';
import { Place } from '../../models/IPlace';
import { DataService } from '../../services/data';
import { ForecastDay } from '../../models/IForeCastDay';
import { Feature } from '../../models/strings';

@Component({
  templateUrl: 'ten-days.html'
})
export class TenDays implements OnInit {

  forecasts: ForecastDay[];
  search: Place;

  ngOnInit() {
    this.fetchData(null);
  }

  constructor(public navCtrl: NavController, param: NavParams, private ds: DataService, private loadingCtrl: LoadingController) {
    this.search = param.data;
    // check if data was passed in
    if (!this.search.city) {
      this.search = undefined;
    }
  }

  fetchData(refresher: Refresher) {
    if (!refresher) {
      var loader = this.loadingCtrl.create({
        content: "Plsease wait..."
      });
      loader.present();
    }
    this.ds.getForecast(Feature.ten, this.search).then(res => {
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
