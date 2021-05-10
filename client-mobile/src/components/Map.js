import React, { useContext } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import MapView, { Polyline, Circle } from 'react-native-maps';
import { LocationContext } from '../context/LocationContext';


export default function Map() {
    const { locationState: { currentLocation, locations } } = useContext(LocationContext);
    
    // const points = [];

    // for (let i = 0; i < 22; i++){

    //     if (i % 2 === 0) {
    //         points.push({
    //         latitude: 34.1319302673986 + (i * 0.01),
    //         longitude: 74.82571230364024 + (i * 0.01)
    //         })
    //     } else {
    //         points.push({
    //         latitude: 34.1319302673986 - (i * 0.01),
    //         longitude: 74.82571230364024 + (i * 0.01)
    //     })
    //     }
        
    // }

    if (!currentLocation) {
        return <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 200 }} />
    }


    return (
        <View>
            <MapView style={styles.map}
                initialRegion={{ latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 }}
            // region={{ latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 }}
            >
                <Polyline coordinates={locations.map(({ coords: { longitude, latitude } }) => ({ longitude, latitude }))} />

                <Circle center={{ latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude }} radius={20}
                    strokeColor="rgba(158, 158, 255, 1.0)" fillColor="rgba(158, 158, 255, 0.3)" />
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    map: {
        height: 500
    },
})
