import { Pref } from './../../models/IPref';
import { ForecastHour } from './../../models/IForeCastHour';
import { Place } from './../../models/IPlace';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { EVENT, Degree, Volume, Speed } from '../../providers/strings';

@Component({
  selector: 'page-by-hour',
  templateUrl: 'by-hour.html',
})
export class ByHourPage implements OnInit {

  search: Place;
  forecasts: ForecastHour[];
  pref: Pref;
  date: string;

  deg = Degree;
  vol = Volume;
  speed = Speed;

  constructor(public navCtrl: NavController, param: NavParams, private event: Events) {
    this.search = param.data.search;
    this.forecasts = param.data.forecasts;
    this.pref = param.data.pref;
    let firstDay = this.forecasts[0].FCTTIME;
    this.date = [firstDay.month_name, firstDay.mday].join(" ");
  }

  ngOnInit() {
    this.event.subscribe(EVENT.change, (pref: Pref) => this.pref = pref);
  }


}