// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons'; 

import TrackListScreen from './src/screens/TrackListScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import SignupScreen from './src/screens/SignupScreen';
import SigninScreen from './src/screens/SigninScreen';
import AccountScreen from './src/screens/AccountScreen';
import AuthProvider, { AuthContext } from './src/context/AuthContext';
import LocationProvider, { LocationContext } from './src/context/LocationContext';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const TrackStackNavigator = () => {
  const { locationState: { tracks } } = React.useContext(LocationContext);
  return (
          <Stack.Navigator>
            <Stack.Screen name="Track List" component={TrackListScreen} options={ {title: "Tracks"}}/>
            <Stack.Screen name="Track Detail" component={TrackDetailScreen} options={(props) => {
                const track = tracks.find((track) => track._id === props.route.params.id);
                return {
                  title: track.name
                }
            } }/>
          </Stack.Navigator>
  )
}

function App() {
  const { state }  = React.useContext(AuthContext);
  console.log(state)
  return (
    
    <NavigationContainer>
        {!state.token ? (
          <Stack.Navigator>
          <Stack.Screen name="Sign In" component={SigninScreen} options={{ header: () => null }} />
            <Stack.Screen name="Sign Up" component={SignupScreen} />
          </Stack.Navigator>
        ) : (
          <Tab.Navigator>

            <Tab.Screen name="Track List" component={TrackStackNavigator}  options={ {tabBarIcon: () => <FontAwesome name="list-ul" size={24} color="black" />}  }/>
            <Tab.Screen name="Track Create" component={TrackCreateScreen} options={ {tabBarIcon: () => <FontAwesome5 name="plus" size={24} color="black" />}  }/>
            <Tab.Screen name="Account" component={AccountScreen}  options={ {tabBarIcon: () => <FontAwesome name="gear" size={24} color="black" />}  }/>

          </Tab.Navigator>
      )}
      
      </NavigationContainer>
  );
}


function Index() {
  return (
    <AuthProvider>
      <LocationProvider>
            <App />
      </LocationProvider>
    </AuthProvider>
    )
}

export default Index;