import { CurrentObservation } from './../../models/ICurrentObservation';
import { DataService } from './../../services/data';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

@Component({
  templateUrl: 'current.html'
})
export class Current implements OnInit{

  forecast: CurrentObservation;

  ngOnInit(){
    let loader = this.loadingCtrl.create({
      content: "Plsease wait..."
    });
    loader.present();

    this.data.getForecast("conditions").then(res => {
      this.forecast = <CurrentObservation> res.json().current_observation;
      console.log(this.forecast);
      if (!this.forecast) {
        console.log(res.json().response.error);
      }
      loader.dismiss();
    }).catch(err => {
      console.log(err);
      loader.dismiss();
    });
  }

  constructor(public navCtrl: NavController, private data: DataService, private loadingCtrl:LoadingController) {}

}
