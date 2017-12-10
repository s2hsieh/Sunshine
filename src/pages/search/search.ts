import { TabsPage } from './../tabs/tabs';
import { DataService } from './../../services/data';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Searchbar } from 'ionic-angular';
import { Place } from '../../models/IPlace';

@IonicPage()
@Component({
  templateUrl: 'search.html',
})
export class SearchPage {

  ionViewDidEnter() {
    setTimeout(() => {
      this.searchbar.setFocus();
    });
  }

  places: Place[];
  @ViewChild(Searchbar) searchbar: Searchbar;

  constructor(public navCtrl: NavController, private data: DataService) { }

  onInput(ev) {
    let search: string = ev.target.value;
    if (search) {
      this.data.searchLocation(search).then(res => {
        this.places = this.data.getLocationResults();
      });
    } else {
      this.places = [];
    }
  }

  openForecast(place: string) {
    this.navCtrl.push(TabsPage, { place: place });
  }
}
