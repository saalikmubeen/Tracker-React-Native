import { useContext, useCallback, useState, useEffect } from "react";
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { LocationContext } from "../context/LocationContext";


const useLocation = () => {
    const navigation = useNavigation();
    const { locationDispatch, locationState: { recording, locations } } = useContext(LocationContext);
    const [error, setError] = useState(null);
    const [subscriber, setSubscriber] = useState(null);


    const requestLocation = async () => {
        try {
            await requestPermissionsAsync();
            const sub = await watchPositionAsync({
                accuracy: Accuracy.BestForNavigation,
                timeInterval: 1000,
                distanceInterval: 10 // once every ten meter
            }, (location) => {
                // console.log(location);
                locationDispatch({ type: "UPDATE_CURRENT_LOCATION", payload: { currentLocation: location } });

                if (recording) {
                    locationDispatch({ type: "ADD_LOCATION", payload: { location: location } });
                }
            });

            setSubscriber(sub);

        } catch (err) {
            console.log(err)
            setError(err)
        }
    }

    // console.log(locations.length)

    useFocusEffect(
        useCallback(() => {
            console.log("focussed")
            if (!subscriber) {
                requestLocation()
            }


        return () => {
            console.log("unfocussed")
            if (subscriber && !recording) {
                subscriber.remove();
                setSubscriber(null);
            }
            };
            
    }, [recording, subscriber])
    );
    
    useEffect(() => {
        if (!recording) {
            requestLocation()
        }
    }, [recording])

    return error;

}


export default useLocation;