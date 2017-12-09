import { Place } from './../../models/IPlace';
import { CurrentObservation } from './../../models/ICurrentObservation';
import { DataService } from './../../services/data';
import { Component, OnInit } from '@angular/core';
import { App, NavController, LoadingController, Refresher, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'current.html'
})
export class Current implements OnInit{

  forecast: CurrentObservation;
  private search: Place;

  ngOnInit(){
    this.fetchData(null);
  }

  constructor(param:NavParams, public navCtrl: NavController, private appCtrl:App, private data: DataService, private loadingCtrl:LoadingController) {
    this.search = param.data;
    // check if data was passed in
    if (!this.search.city) {
      this.search = undefined;
    }
  }

  openSearch(){
    this.appCtrl.getRootNav().push("SearchPage", );
  }

  private fetchData(refresher:Refresher){
    if (!refresher) {
      var loader = this.loadingCtrl.create({
        content: "Plsease wait..."
      });
      loader.present();
    }
    this.data.getForecast("conditions", this.search).then(res => {
      try {
        this.forecast = <CurrentObservation> res.json().current_observation;
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
