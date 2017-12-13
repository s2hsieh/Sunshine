import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';
import { Units } from '../models/IPref';
import { Distance, Speed, Pressure, Volume, Degree, EVENT } from '../providers/strings';
import { Events } from 'ionic-angular/util/events';

@Injectable()
export class PreferencesService {

    private readonly default: Units = {
        distance: Distance.metric,
        speed: Speed.metric,
        pressure: Pressure.metric,
        volume: Volume.metric,
        degree: Degree.metric
    }

    constructor(private nativeStorage: NativeStorage, private event: Events) { }

    initialize() {
        this.nativeStorage.getItem("units").then(units => {
            this.event.publish(EVENT.init, units);
        }).catch(err => {
            if (err.code == 2 || err.code.code == 2) {
                this.nativeStorage.setItem("units", this.default).then(units => {
                    console.log("initialize preferences");
                    this.event.publish(EVENT.init, units);
                });
            } else {
                console.log(err);
            }
        });
    }

    getPref(): Promise<Units> {
        return this.nativeStorage.getItem("units").catch(this.handleError);
    }

    setPref(save: Units) {
        return this.nativeStorage.setItem("units", save).catch(this.handleError);
    }

    private handleError(err) {
        console.log(err);
    }
}