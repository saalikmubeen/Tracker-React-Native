import React, { useContext } from 'react'
import { StyleSheet , View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';

function AccountScreen() {
    const { dispatch } = useContext(AuthContext);

    const handlePress = async () => {
        await AsyncStorage.removeItem('auth_token');
        dispatch({ type: "LOGOUT" });
    }

    return (
        <View style={{margin: 50}}>
            <Text h4 style={styles.heading}>Accounts</Text>
            <Button title="Logout" onPress={ handlePress } />
        </View>
    )
}

const styles = StyleSheet.create({
    heading: {
        textAlign: "center",
        marginBottom: 25
    }
})

export default AccountScreen;
