import { DataService } from './../../services/data';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'current.html'
})
export class Current {

  constructor(public navCtrl: NavController, private data: DataService) {
    this.data.getCurrent();
  }


}
