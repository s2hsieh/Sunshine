import { TabsPage } from './../tabs/tabs';
import { DataService } from './../../services/data';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'search.html',
})
export class SearchPage {

  places: string[];

  constructor(public navCtrl: NavController, private data: DataService) { }

  onInput(ev) {
    let search: string = ev.target.value;
    if (search) {
      this.data.getLocationSearch(search).then(res => {
        this.places = this.data.results;
      });
    } else {
      this.places = [];
    }
  }

  openForecast(place: string) {
    this.navCtrl.setRoot(TabsPage, { place: place });
  }
}
