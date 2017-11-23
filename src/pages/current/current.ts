import { DataService } from './../../services/data';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

@Component({
  templateUrl: 'current.html'
})
export class Current implements OnInit{

  forecast = {};

  ngOnInit(){
    let loader = this.loader.create({
      content: "Plsease wait..."
    });
    loader.present();

    this.data.getCurrent().then(res => {
      this.forecast = res.json().current_observation;
      loader.dismiss();
    }).catch(err => {
      console.log(err);
      loader.dismiss();
    });
  }

  constructor(public navCtrl: NavController, private data: DataService, private loader:LoadingController) {}


}
