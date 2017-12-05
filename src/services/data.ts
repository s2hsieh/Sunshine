import { Geolocation } from '@ionic-native/geolocation';
import { Injectable } from '@angular/core';
import { Http, Response, Jsonp } from '@angular/http';

@Injectable()
export class DataService {

    private keys = {
        weatherUnderground: "1760644cb1b2f8da",
        bingMaps: "Au59ZRQJvN8hb2HiQpgzuGzxKOab4hVhR64mV_DEnWRhKOMmGohCHcUYIkLTKAxf"
    }
    private urlEnd: string;
    private weatherUrlBase: string = `http://api.wunderground.com/api/${this.keys.weatherUnderground}/`;
    private locationUrlBase: string = "http://dev.virtualearth.net/REST/v1/Locations";

    constructor(private http: Http, private jsonp: Jsonp, private geo: Geolocation) { }

    private getLocationGPS() {
        return this.geo.getCurrentPosition().then(res => {
            this.urlEnd = `/q/${res.coords.latitude},${res.coords.longitude}.json`;
        }).catch(this.errorHandler);
    }

    private getLocationSearch(search: string) {
        return this.jsonp.get(`${this.locationUrlBase}?q=${encodeURI(search)}&maxResults=1&key=${this.keys.bingMaps}&jsonp=JSONP_CALLBACK`)
        .toPromise().then(res => {
            let cord = res.json().resourceSets[0].resources[0].point.coordinates;
            this.urlEnd = `/q/${cord[0]},${cord[1]}.json`;
        }).catch(this.errorHandler);
    }
    
    private bingJsonpCallback() {
        
    }

    async getForecast(feature: string, location?: string): Promise<Response> {
        let that = this;
        let promise;
        if (!location) {
            await this.getLocationGPS().then(fetchWeather);
        } else {
            await this.getLocationSearch(location).then(fetchWeather);
        }
        return promise;

        function fetchWeather() {
            promise = that.http.get(that.weatherUrlBase + feature + that.urlEnd).toPromise().catch(that.errorHandler);
        }
    }

    private errorHandler(err) { console.log("Error: " + err) }

}