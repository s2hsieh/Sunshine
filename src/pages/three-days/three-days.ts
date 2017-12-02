import { ForecastDay } from './../../models/IForeCastDay';
import { DataService } from './../../services/data';
import { Component, OnInit } from '@angular/core';
import { NavController, Refresher, LoadingController } from 'ionic-angular';

@Component({
  templateUrl: 'three-days.html'
})
export class ThreeDays implements OnInit{

  forecast:ForecastDay[];

  ngOnInit(){
    this.fetchData(null);
  }

  constructor(public navCtrl: NavController,private data:DataService, private loadingCtrl:LoadingController) {}

  fetchData(refresher:Refresher){
    if (!refresher) {
      var loader = this.loadingCtrl.create({
        content: "Plsease wait..."
      });
      loader.present();
    }
    this.data.getForecast("forecast").then(res => {
      this.forecast = <ForecastDay[]> res.json().forecast.simpleforecast.forecastday;
      console.log(this.forecast);
      if (!this.forecast) {
        throw new Error("Failed to fetch data from API");
      }
      refresher ? refresher.complete() : loader.dismiss();
    }).catch(err => {
      console.log(err);
      refresher ? refresher.complete() : loader.dismiss();
    });
  }
}
