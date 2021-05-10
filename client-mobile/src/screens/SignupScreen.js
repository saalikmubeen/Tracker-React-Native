import React, { useContext, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Text as Text2 } from 'react-native-elements';
import LoginForm from '../components/LoginForm';
import { AuthContext } from '../context/AuthContext';

export default function SignupScreen({ navigation }) {
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
            <Text2 h3 style={styles.heading}>Join Tracker!</Text2>
            <LoginForm type="signup"/>

            <TouchableOpacity onPress={() => navigation.navigate("Sign In") }>
                <Text style={styles.link}>Already have an account? Sign In</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 20,
        marginBottom: 100
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
