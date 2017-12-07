import { DataService } from './../../services/data';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  templateUrl: 'search.html',
})
export class SearchPage {

  places:string[];

  constructor(public navCtrl: NavController, private data:DataService) {}

  onInput(ev){
    let search:string = ev.target.value;
    if (search) {
      this.data.getLocationSearch(search).then(res => {
        this.places = this.data.results;
      });
    }else{
      this.places = [];
    }
  }
}
