import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {MainStackNavigator ,SettingStackNavigator} from "./StackNavigator";
import Icon from 'react-native-vector-icons/MaterialIcons';


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      showLabel: false,
      activeTintColor :'#EAECEE',
      inactiveTintColor : 'black',
      activeBackgroundColor:'#D4C7BE',
      inactiveBackgroundColor:'#D4C7BE',
    }}
    >
    <Tab.Screen 
      name="Home" 
      component={MainStackNavigator}
      options={{
        tabBarIcon: ({ color }) => (
          <Icon name="home" color={color} size={30} />
        ),
        }}
    />  
    <Tab.Screen 
      name="Setting" 
      component={SettingStackNavigator}
      options={{
        tabBarIcon: ({  color }) => (
            <Icon name="settings" color={color} size={30} />
        ),
        }}
    />  

    </Tab.Navigator>
  );
};

export default BottomTabNavigator;