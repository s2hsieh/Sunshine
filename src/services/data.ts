import { Events } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Injectable } from '@angular/core';
import { Http, Response, Jsonp } from '@angular/http';
import { Place } from '../models/IPlace';
import { KEYS, EVENTS } from '../providers/strings';

@Injectable()
export class DataService {

    private urlEnd: string;
    private weatherUrlBase: string = `http://api.wunderground.com/api/${KEYS.weatherUnderground}/`;
    private locationUrlBase: string = "http://dev.virtualearth.net/REST/v1/Locations";
    private results: Place[];

    constructor(private http: Http, private jsonp: Jsonp, private geo: Geolocation, private event: Events) { }

    private getGPSLocation() {
        return this.geo.getCurrentPosition().then(res => {
            this.urlEnd = `/q/${res.coords.latitude},${res.coords.longitude}.json`;
        }).catch(err => {
            // handle no GPS access
            this.urlEnd = "/q/autoip.json";
            console.log(err);
        });
    }

    searchLocation(search: string) {
        let that = this;
        this.results = [];
        this.jsonp.get(`${this.locationUrlBase}?q=${search}&maxResults=10&key=${KEYS.bingMaps}&jsonp=JSONP_CALLBACK`)
            .toPromise().then(res => {
                let data: any[];
                try {
                    data = res.json().resourceSets[0].resources;
                } catch (error) {
                    throw new Error("Failed to get search results");
                }
                let numResults = data.length;
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
                        place = new Place({ lat: place.lat, lon: place.lon }, place.city, place.state, place.country_iso3166);
                        if (that.results.findIndex(v => place.toString() == v.toString()) < 0) {
                            that.results.push(place);
                        }
                        numResults--;
                        if (!numResults) {
                            this.event.publish(EVENTS.search, this.results);
                        }
                    })
                        .catch(that.errorHandler);
                });
            }).catch(this.errorHandler);
    }

    async getForecast(feature: string, location: Place): Promise<Response> {
        let that = this;
        let promise;
        if (!location) {
            await this.getGPSLocation().then(fetchWeatherPromise);
        } else {
            this.urlEnd = `/q/${location.cord.lat},${location.cord.lon}.json`;
            fetchWeatherPromise();
        }
        return promise;

        function fetchWeatherPromise() {
            promise = that.http.get(that.weatherUrlBase + feature + that.urlEnd).toPromise().catch(that.errorHandler);
        }
    }

    private errorHandler(err) {
        if (err.message) {
            console.log("Error: " + err.message);
        } else {
            console.log("Error: " + err);
        }
    }

}