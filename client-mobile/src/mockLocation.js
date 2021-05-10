import * as Location from "expo-location";

const tenMetersWithDegrees = 0.0001;  // represent 10 meters in latitude and longitude;

const getLocation = (increment) => {
    return {
        timestamp: 10000000,
        coords: {
            speed: 0,
            heading: 0,
            accuracy: 5,
            altitudeAccuracy: 5,
            altitude: 5,
            longitude:  74.8393493 + increment * tenMetersWithDegrees,
            latitude:  34.1246764 + increment * tenMetersWithDegrees,
        }
    }
}

let counter = 0;

setInterval(() => {
    Location.EventEmitter.emit("Expo.locationChanged", {
        location: getLocation(counter),
        watchId: Location._getCurrentWatchId()
    });

    counter ++
}, 1000)

