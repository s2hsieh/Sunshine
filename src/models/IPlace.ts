export interface Cordinates {
    lat: string,
    lon: string
}

export class Place {

    constructor(readonly cord: Cordinates, readonly city: string, readonly provOrState: string, readonly country: string, readonly isGPS = false) { }

    toString() {
        return [this.city, this.provOrState, this.country].join(", ");
    }

    clone(){
        return new Place(this.cord, this.city, this.provOrState, this.country, this.isGPS);
    }
}