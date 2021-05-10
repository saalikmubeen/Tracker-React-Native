import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import MapView, {Polyline} from "react-native-maps";
import { LocationContext } from '../context/LocationContext';

export default function TrackDetailScreen({ route }) {
    const { locationState: { tracks } } = useContext(LocationContext);
    
    const track = tracks.find((track) => track._id === route.params.id);

    return (
        <View style={styles.container}>
            <MapView style={styles.map} initialRegion={{ latitudeDelta: 0.01, longitudeDelta: 0.01, ...track.locations[0].coords }}>
                <Polyline coordinates={ track.locations.map((location) => location.coords) }/>
            </MapView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginTop: 10
    },

    map: {
        height: 500
    }
})
