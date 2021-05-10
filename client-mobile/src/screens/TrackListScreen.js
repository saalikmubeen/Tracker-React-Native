import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ListItem } from "react-native-elements";
import api from "../api";
import { LocationContext } from '../context/LocationContext';

export default function TrackListScreen({ navigation }) {
    const { locationDispatch, locationState: { tracks } } = useContext(LocationContext);

    const fetchTracks = async () => {
        const res = await api.get("/tracks");
        console.log(res.data)
        locationDispatch({ type: "FETCH_TRACKS", payload: { tracks: res.data } });
    }

    useEffect(() => {

        console.log("from list")
        fetchTracks();
    }, [])


    if (tracks.length <= 0) {
        return <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 200 }} />
    }

    return (
        <View style={styles.container}>
            
            <FlatList data={tracks} keyExtractor={(element) => element._id} renderItem={({ item }) => {
                return (
                    <TouchableOpacity onPress={() => navigation.navigate("Track Detail", { id: item._id })}>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title>{item.name}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    </TouchableOpacity>
                )
            } }/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15
    }
})
