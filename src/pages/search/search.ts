import { TabsPage } from './../tabs/tabs';
import { DataService } from './../../services/data';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Searchbar, Events } from 'ionic-angular';
import { Place } from '../../models/IPlace';
import { EVENTS } from '../../providers/strings';

@IonicPage()
@Component({
  templateUrl: 'search.html',
})
export class SearchPage {

  places: Place[];
  @ViewChild(Searchbar) searchbar: Searchbar;

  constructor(public navCtrl: NavController, private data: DataService, event: Events) {
    event.subscribe(EVENTS.search, results => this.places = results);
  }

  onInput(ev) {
    let search: string = ev.target.value;
    if (search) {
      this.data.searchLocation(search);
    } else {
      this.places = [];
    }
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.searchbar.setFocus();
    });
  }

  openForecast(place: Place) {
    this.navCtrl.push(TabsPage, { place: place });
  }
}