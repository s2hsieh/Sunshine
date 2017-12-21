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

export const IconSetList = [6, 7, 8, 9, 10, 11];

export enum EVENT {
    init = "initialized preferences",
    change = "changed preferences",
    gps = "GPS location"
}