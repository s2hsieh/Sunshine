import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';
import { Units } from '../models/IPref';
import { Place } from '../models/IPlace';

@Injectable()
export class PreferencesService {

    private places: Place[];
    private units:Units;
    private default: Units = {
        distance: "km",
        speed: "km/h",
        pressure:"mb",
        volume:"mm",
        degree:"c"
    }

    constructor(private nativeStorage:NativeStorage) {}

    initialize(){
        this.nativeStorage.getItem("units").then(units => {
            this.units = <Units>units;
            console.log(this.units);
        }).catch(err => {
            if (err.code.code == 2) {
                this.nativeStorage.setItem("units", this.default).then(units => {
                    this.units = units;
                    console.log("initialize preferences");
                });
            }else{
                console.log(err);
            }
        })
    }
}