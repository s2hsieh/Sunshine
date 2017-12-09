import { Geolocation } from '@ionic-native/geolocation';
import { Injectable } from '@angular/core';
import { Http, Response, Jsonp } from '@angular/http';
import { Place } from '../models/IPlace';

@Injectable()
export class DataService {

    private keys = {
        weatherUnderground: "1760644cb1b2f8da",
        bingMaps: "Au59ZRQJvN8hb2HiQpgzuGzxKOab4hVhR64mV_DEnWRhKOMmGohCHcUYIkLTKAxf"
    }
    private urlEnd: string;
    private weatherUrlBase: string = `http://api.wunderground.com/api/${this.keys.weatherUnderground}/`;
    private locationUrlBase: string = "http://dev.virtualearth.net/REST/v1/Locations";
    results: Place[];

    constructor(private http: Http, private jsonp: Jsonp, private geo: Geolocation) { }

    private getLocationGPS() {
        return this.geo.getCurrentPosition().then(res => {
            this.urlEnd = `/q/${res.coords.latitude},${res.coords.longitude}.json`;
        }).catch(this.errorHandler);
    }

    getLocationSearch(search: string) {
        let that = this;
        this.results = [];
        return this.jsonp.get(`${this.locationUrlBase}?q=${search}&key=${this.keys.bingMaps}&jsonp=JSONP_CALLBACK`)
            .toPromise().then(res => {
                let data:any[];
                console.log(res.json());
                try {
                    data = res.json().resourceSets[0].resources;
                } catch (error) {
                    throw new Error("Failed to get search results");
                }
                data.forEach(r => {
                    let cord = r.point.coordinates;
                    that.urlEnd = `/q/${cord[0]},${cord[1]}.json`;
                    that.http.get(that.weatherUrlBase + "geolookup" + that.urlEnd).toPromise().then(res => {
                        let place;
                        try {
                            place = res.json().location;
                        } catch (error) {
                            throw new Error("Failed to get location name")
                        }
                        that.results.push({
                            cord:{
                                lat:place.lat,
                                lon:place.lon
                            },
                            city:place.city,
                            provOrState:place.state,
                            country:place.country_name
                        });
                    })
                    .catch(that.errorHandler);
                });
            }).catch(this.errorHandler);
    }

    async getForecast(feature: string, location: Place): Promise<Response> {
        let that = this;
        let promise;
        if (!location) {
            await this.getLocationGPS().then(fetchWeatherPromise);
        } else {
            this.urlEnd = `/q/${location.cord.lat},${location.cord.lon}.json`;
            fetchWeatherPromise();
        }
        return promise;

        function fetchWeatherPromise() {
            promise = that.http.get(that.weatherUrlBase + feature + that.urlEnd).toPromise().catch(that.errorHandler);
        }
    }

    private errorHandler(err) { console.log("Error: " + err) }

}