import "../mockLocation";
import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import Map from '../components/Map'
import useLocation from '../hooks/useLocation';
import TrackForm from "../components/TrackForm";

export default function TrackCreateScreen() {
    const error = useLocation()

    return (
        <View style={{ marginTop: 50, marginHorizontal: 10, flex: 1 }}>
            <ScrollView>
            
            <Text h3 style={styles.heading}>Create Track</Text>
            <Map />
            {error && <Text style={styles.error}>{error}</Text>}

                <TrackForm />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    error: {
        color: "red",
        margin: 40
    },

    heading: {
        marginVertical: 10,
        textAlign: "center"
    }
})
