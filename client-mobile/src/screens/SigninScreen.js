import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, Button, TouchableOpacity, Text } from 'react-native';
import { Text as Text2 } from 'react-native-elements';
import LoginForm from '../components/LoginForm';
import { AuthContext } from '../context/AuthContext';

export default function SigninScreen({ navigation }) {
    const { dispatch } = useContext(AuthContext);

    useEffect(() => {

        const listener = navigation.addListener("blur", () => {
            dispatch({ type: "CLEAR_ERRORS" });
        })

        return () => {
            navigation.removeListener(listener);
        }
    }, [])
    
    return (
        <View style={styles.container}>
            <Text2 h3 style={styles.heading}>Sign In to your account!</Text2>
            <LoginForm type="signin"/>

            <TouchableOpacity onPress={() => navigation.navigate("Sign Up") }>
                <Text style={styles.link}>New to Tracker? Create Account</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 20
    },

    link: {
        color: "#0000EE",
        marginTop: 25
    },

    heading: {
        textAlign: 'center',
        marginBottom: 20
    }
})
