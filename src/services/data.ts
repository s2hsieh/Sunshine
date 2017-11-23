import { Geolocation } from '@ionic-native/geolocation';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

enum Feature {
    conditions = "conditions",
    forecast = "forecast",
    forecast10day = "forecast10day"
}

@Injectable()
export class DataService {
    private urlEnd: string;
    private urlBase: string = "http://api.wunderground.com/api/1760644cb1b2f8da/";

    constructor(private http: Http, private geo:Geolocation) {}
    
    getLocation(){
        return this.geo.getCurrentPosition().then( res => {
            this.urlEnd = `/q/${res.coords.latitude},${res.coords.longitude}.json`;
        }).catch( err => {
            console.log(err);
        });
    }

    async getCurrent(): Promise<Response>{
        let promise;
        await this.getLocation().then(res => {
            promise = this.http.get(this.urlBase + Feature.conditions + this.urlEnd).toPromise();
        });
        return promise;
    }

}