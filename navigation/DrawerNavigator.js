import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {Image} from "react-native";

import { WomenStackNavigator ,MenStackNavigator } from "./StackNavigator";
import BottomTabNavigator from "./TabNavigator";
import Icon from 'react-native-vector-icons/MaterialIcons';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
        initialRouteName="Home"
        drawerContentOptions={{
        showLabel: false,
        activeTintColor :'#EAECEE',
        activeBackgroundColor:'#D4C7BE',
        inactiveTintColor : 'black',
        itemStyle: {marginVertical:5},
        }}
    >

    <Drawer.Screen 
      name="Home" 
      component={BottomTabNavigator} 
      options={{
        drawerIcon: ({ focused}) => (
          <Image
          source={require("../assets/images/home.png")}
          resizeMode="contain"
          style={{
              width: 25,
              height: 25,
              tintColor: focused ? "#EAECEE" : "black"
          }}
          />
        ),
    }}
    />

    <Drawer.Screen 
      name="Women" 
      component={WomenStackNavigator} 
      options={{
      drawerIcon: ({focused }) => (
        <Image
        source={require("../assets/images/women.png")}
        resizeMode="contain"
        style={{
            width: 25,
            height: 25,
            tintColor: focused ? "#EAECEE" : "black"
        }}
        />
        ),   
    }}
    />

    <Drawer.Screen 
      name="Men" 
      component={MenStackNavigator} 
      options={{
        drawerIcon: ({ focused }) => (
          <Image
          source={require("../assets/images/men.png")}
          resizeMode="contain"
          style={{
              width: 25,
              height: 25,
              tintColor: focused ? "#EAECEE" : "black"
          }}
          />
        ),
    }}
    />

    </Drawer.Navigator>
  );
}

export default DrawerNavigator;