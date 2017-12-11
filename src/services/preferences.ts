import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';
import { Units } from '../models/IPref';
import { Place } from '../models/IPlace';
import { Distance, Speed, Pressure, Volume, Degree } from '../models/strings';

@Injectable()
export class PreferencesService {

    private places: Place[];
    private units: Units;
    private readonly default: Units = {
        distance: Distance.metric,
        speed: Speed.metric,
        pressure: Pressure.metric,
        volume: Volume.metric,
        degree: Degree.metric
    }

    constructor(private nativeStorage: NativeStorage) { }

    initialize() {
        this.nativeStorage.getItem("units").then(units => {
            this.units = <Units>units;
            console.log(this.units);
        }).catch(err => {
            if (err.code == 2) {
                this.nativeStorage.setItem("units", this.default).then(units => {
                    this.units = units;
                    console.log("initialize preferences");
                });
            } else {
                console.log(err);
            }
        })
    }

    getPref():Promise<Units>{
        return this.nativeStorage.getItem("units").catch(err => {
            console.log(err);
        });
    }
}