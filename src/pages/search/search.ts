import { TabsPage } from './../tabs/tabs';
import { DataService } from './../../services/data';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Place } from '../../models/IPlace';

@IonicPage()
@Component({
  templateUrl: 'search.html',
})
export class SearchPage {

  places: Place[];

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
    this.navCtrl.push(TabsPage, { place: place });
  }
}
