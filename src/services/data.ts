import { Geolocation } from '@ionic-native/geolocation';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataService {
    private longitude?: number;
    private latitude?: number;
    private city?: string;
    private urlBase: string = "http://api.wunderground.com/api/1760644cb1b2f8da/geolookup/q/";

    constructor(private http: Http, private geo:Geolocation) { }
    
    getLocation(){
        return this.geo.getCurrentPosition().then((res)=>{
            this.latitude = res.coords.latitude;
            this.longitude = res.coords.longitude;
        }).catch((err)=>{
            this.longitude = null;
            this.latitude = null;
            this.city = null; 
            console.log(err);
        });
    }

    getCurrent(){
        this.getLocation().then(res=>{
            this.http.get(this.urlBase + this.latitude + "," + this.longitude + ".json").toPromise().then(res => {
                console.log(res.json());
            });
        });
    }
}