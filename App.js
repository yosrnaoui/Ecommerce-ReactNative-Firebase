/*import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import DrawerNavigator from "./navigation/DrawerNavigator";

 const App = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
export default App;

import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen, RegistrationScreen } from './src/screens'
import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  return (
    <NavigationContainer>
      <Stack.Navigator>
        { user ? (
          <Stack.Screen name="Home">
            {props => <HomeScreen {...props} extraData={user} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}
        <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Home" component={DrawerNavigator} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
*/

import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from "./navigation/DrawerNavigator";
import Login from "./screens/LoginScreen";
import SignUp from "./screens/SignScreen";
import { firebase } from './firebase/config';
import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

const screenOptionsStyle = {
  headerStyle: {
      backgroundColor: "#D4C7BE",
    },
    headerTintColor: 'transparent',
    headerTransparent:true,
};

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  if (loading) {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptionsStyle}>
      { user ? (
          <Stack.Screen name="Home">
            {props => <DrawerNavigator {...props} extraData={user} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Home" component={DrawerNavigator} /> 
          </>
        )}   
      </Stack.Navigator>
    </NavigationContainer>
  );
  }
    useEffect(() => {
      const usersRef = firebase.firestore().collection('users');
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            usersRef
              .doc(user.uid)
              .get()
              .then((document) => {
                const userData = document.data()
                setLoading(false)
                setUser(userData)
              })
              .catch((error) => {
                setLoading(false)
              });
            } 
            else {
              setLoading(false)
            }
          });
        }, []);      
}