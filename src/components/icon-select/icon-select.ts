import { NavParams, ViewController } from 'ionic-angular';
import { Component } from '@angular/core';
import { IconSetList } from '../../providers/strings';

@Component({
  selector: 'icon-select',
  templateUrl: 'icon-select.html'
})
export class IconSelectComponent {

  iconChoice: number;
  iconSet = IconSetList;
  private iconUrlBase = "https://icons.wxug.com/i/c/";
  private iconUrlEnd = "/partlycloudy.gif";

  constructor(param: NavParams, private viewCtrl: ViewController) {
    this.iconChoice = param.data.setNum;
  }

  iconUrl(setNum: number) {
    return this.iconUrlBase + String.fromCharCode(+setNum + 96) + this.iconUrlEnd;
  }

  close(){
    this.viewCtrl.dismiss();
  }

  selected(setNum: number) {
    this.iconChoice = setNum;
    this.viewCtrl.dismiss(this.iconChoice);
  }
}
