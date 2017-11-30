import { CurrentObservation } from './../../models/ICurrentObservation';
import { DataService } from './../../services/data';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Refresher } from 'ionic-angular/components/refresher/refresher';

@Component({
  templateUrl: 'current.html'
})
export class Current implements OnInit{

  forecast: CurrentObservation;

  ngOnInit(){
    this.fetchData(null);
  }

  constructor(public navCtrl: NavController, private data: DataService, private loadingCtrl:LoadingController) {}

  fetchData(refresher?:Refresher){
    if (!refresher) {
      var loader = this.loadingCtrl.create({
        content: "Plsease wait..."
      });
      loader.present();
    }
    this.data.getForecast("conditions").then(res => {
      this.forecast = <CurrentObservation> res.json().current_observation;
      console.log(this.forecast);
      if (!this.forecast) {
        throw new Error("Failed to fetch data");
      }
      refresher ? refresher.complete() : loader.dismiss();
    }).catch(err => {
      console.log(err);
      refresher ? refresher.complete() : loader.dismiss();
    });
  }
}
