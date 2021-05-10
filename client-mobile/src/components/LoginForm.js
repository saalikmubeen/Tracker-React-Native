import React,{useContext, useState} from 'react'
import { StyleSheet, View } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import api from '../api';


export default function LoginForm({ type }) {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [error, setError] = useState("")
    const { state, dispatch } = useContext(AuthContext);

    const handlePress = async () => {
        if (credentials.email.trim() === "" || credentials.password.trim() === "") {
            return setError("Email and password are required fields")
        }
        try {

            if (type === "signup") {
                const res = await api.post("/signup", { email: credentials.email, password: credentials.password });
                await AsyncStorage.setItem('auth_token', res.data.token);
                dispatch({ type: "LOGIN", payload: { token: res.data.token } });
                setError(null)
                setCredentials({ email: "", password: "" });
            }
            
            if (type === "signin") {
                const res = await api.post("/signin", { email: credentials.email, password: credentials.password });
                await AsyncStorage.setItem('auth_token', res.data.token);
                dispatch({ type: "LOGIN", payload: { token: res.data.token } });
                setError(null);
                setCredentials({ email: "", password: "" });
            }

            
        } catch (err) {
            console.log(err)
            dispatch({ type: "ERROR", payload: { error: err.message } });

        }
    }


    return (
        <View >
            <Input placeholder='Email Address' leftIcon={<Icon name='user' size={24} color='black' style={styles.inputIcon} />}
                autoCapitalize='none' autoCorrect={false} value={credentials.email} onChangeText={(newVal) => setCredentials({...credentials, email: newVal})}/>

            <Input placeholder='Password' leftIcon={<Icon name='lock' size={24} color='black' style={styles.inputIcon} />}
                secureTextEntry={true} autoCapitalize='none' autoCorrect={false} value={credentials.password} onChangeText={(newVal) => setCredentials({...credentials, password: newVal})}/>
            
            {state.error && <Text style={styles.error}>* {state.error}</Text>}
            {error.length > 0 && <Text style={styles.error}>* {error}</Text>}

            <Button title={type === "signin" ? "Sign In" : "Sign Up"} onPress={handlePress} />
            

        </View>
    )
}

const styles = StyleSheet.create({
    inputIcon: {
        marginRight: 10
    },

    error: {
        color: "red",
        marginBottom: 15
    }
})
