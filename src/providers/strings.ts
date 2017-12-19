export enum Feature {
    now = "conditions",
    three = "forecast",
    ten = "forecast10day"
}

export enum Distance {
    metric = "km",
    imperial = "mi"
}

export enum Speed {
    metric = "km/h",
    imperial = "mi/h"
}

export enum Pressure {
    metric = "mb",
    imperial = "in"
}

export enum Volume {
    metric = "cm",
    imperial = "in"
}

export enum Degree {
    metric = "Celsius",
    imperial = "Fahrenheit "
}

export enum Observation {
    temp,
    wind,
    precip,
    pressure,
    visibility
}

export const IconSetList: number[] = Array.from({length: 11}, (value, key) => key);

export enum EVENT {
    init = "initialized preferences",
    change = "changed preferences",
    gps = "GPS location"
}