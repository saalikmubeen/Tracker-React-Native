import React, { createContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, token: action.payload.token, error: null };
        case 'LOGOUT':
            return { token: null, error: null };
        case "ERROR":
            return { ...state, error: action.payload.error }
        case "CLEAR_ERRORS":
            return { ...state, error: null };
        default:
            return state;
    }
    return state
}



const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, { token: null, error: null });

    const getToken = async () => {
        const value = await AsyncStorage.getItem('auth_token')

        if (value) {
            dispatch({ type: "LOGIN", payload: { token: value } });
        }
    }

    useEffect(() => {
        getToken()
    }, [])

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;