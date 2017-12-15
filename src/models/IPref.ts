import { Place } from "./IPlace";

export interface Pref {
    degree: string,
    speed: string,
    volume: string,
    pressure: string,
    distance: string,
    locations: Place[]
}