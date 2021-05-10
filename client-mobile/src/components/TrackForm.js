import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { Button, Input } from 'react-native-elements';
import { LocationContext } from '../context/LocationContext';
import api from '../api';

export default function TrackForm() {
    const navigation = useNavigation();
    const { locationDispatch, locationState: { recording, trackName, locations } } = useContext(LocationContext);

    const handlePress = () => {
        if(recording){
            locationDispatch({ type: "STOP_RECORDING" })
        } else {
            locationDispatch({ type: "START_RECORDING" })
        }
    }

    const handleChange = (newVal) => {
        locationDispatch({ type: "ADD_TRACK_NAME", payload: { trackName: newVal } });
    }

    const saveTrack = async () => {
        try {
            await api.post("/tracks", { name: trackName, locations: locations });

            const res = await api.get("tracks");
            locationDispatch({ type: "FETCH_TRACKS", payload: { tracks: res.data } });

            locationDispatch({ type: "CLEAR_STATE" });
            navigation.navigate("Track List");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <View style={styles.form}>
            <Input placeholder="Track Name" onChangeText={handleChange} value={trackName}/>
            
            <Button title={recording ? "Stop" : "Start recording"} onPress={handlePress} />
            <View style={ styles.space}/>
            
            {!recording && locations.length > 0 && <Button title="Save recording" onPress={saveTrack} disabled={ trackName === "" }/>}
            
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        margin: 30,
    },

    space: {
        marginBottom: 40
    }
})
