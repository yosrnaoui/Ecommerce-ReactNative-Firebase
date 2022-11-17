import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/HomeScreen";
import Women from "../screens/WomenScreen";
import Men from "../screens/MenScreen";
/*import ShoppingCart from "../screens/CartScreen";*/
import Setting from "../screens/SettingScreen";
import Login from "../screens/LoginScreen";
import SignUp from "../screens/SignScreen";
import ShoppingCart from "../screens/ShoppingCart";
import CheckOut from "../screens/CheckOutScreen";

const Stack = createStackNavigator();

const screenOptionsStyle = {
    headerStyle: {
        backgroundColor: "#D4C7BE",
      },
      headerTintColor: 'transparent',
      headerTransparent:true,
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionsStyle}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Women" component={Women} />
      <Stack.Screen name="Men" component={Men} />
      <Stack.Screen name="ShoppingCart" component={ShoppingCart} />
      <Stack.Screen name="CheckOut" component={CheckOut} />
    </Stack.Navigator>
  );
}

const SignStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionsStyle}>
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Home1" component={MainStackNavigator} />
    </Stack.Navigator>
  );
}

const LoginStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionsStyle}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignStackNavigator} />
    </Stack.Navigator>
  );
}

const SettingStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionsStyle}>
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="Home1" component={MainStackNavigator} />
      </Stack.Navigator>
    );
}

const WomenStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionsStyle}>
        <Stack.Screen name="Women" component={Women} />
        <Stack.Screen name="Home1" component={MainStackNavigator} />
      </Stack.Navigator>
    );
}

const MenStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionsStyle}>
        <Stack.Screen name="Men" component={Men} />
        <Stack.Screen name="Home1" component={MainStackNavigator} />
      </Stack.Navigator>
    );
}

export { MainStackNavigator ,SettingStackNavigator ,WomenStackNavigator ,MenStackNavigator,LoginStackNavigator,SignStackNavigator};