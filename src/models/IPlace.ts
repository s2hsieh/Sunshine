export interface Cordinates {
    lat: string,
    lon: string
}

export class Place {

    constructor(readonly cord: Cordinates, readonly city: string, readonly provOrState: string, readonly country: string) { }

    toString() {
        return this.city + ", " + this.provOrState + ", " + this.country;
    }
}