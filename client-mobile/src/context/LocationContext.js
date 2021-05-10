import React, { createContext, useReducer } from 'react';

export const LocationContext = createContext();

export const reducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_CURRENT_LOCATION":
            // console.log("Hi there" + Math.random())
            return { ...state, currentLocation: action.payload.currentLocation };
        case "ADD_LOCATION":
            // console.log(state.locations)
            return { ...state, locations: [...state.locations, action.payload.location] };
        case "START_RECORDING":
            return { ...state, recording: true }
        case "STOP_RECORDING":
            return { ...state, recording: false }
        case "ADD_TRACK_NAME":
            return { ...state, trackName: action.payload.trackName }
        case "FETCH_TRACKS":
            return { ...state, tracks: action.payload.tracks };
        case "CLEAR_STATE":
            return { ...state, trackName: "", locations: [] };
        default:
            return state
    }
}


const LocationProvider = ({ children }) => {
    const [locationState, locationDispatch] = useReducer(reducer, { locations: [], recording: false, currentLocation: null, trackName: '', tracks: [] });
    
    return (
        <LocationContext.Provider value={{ locationState, locationDispatch }}>
            {children}
        </LocationContext.Provider>
    )
}

export default LocationProvider;