import React, {useState} from 'react';
import {  StyleSheet, View, Text, TouchableOpacity, FlatList,Modal,Image} from 'react-native';
import * as theme from '../assets/constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { firebase } from '../firebase/config';
// const with the current theme (dark / light)
const currentTheme = theme.colors.light

const Setting = ({navigation}) => {

    const onLogOutPress = () => {
        firebase
        .auth()
        .signOut()
        .then(() => console.log('User signed out!'),
        navigation.navigate('Login'));
    }

    return(
        <View style={{flex: 1}}>
            <View style={styles.container}>
                {/* ShoppingCart */}
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() =>navigation.navigate("Home")} >
                    <View>
                        <Image source={require('../assets/images/brand.png')}/>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconCaontainer} onPress={() =>onLogOutPress()}>
                        <Icon name="logout" color={currentTheme.background} size={25} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
            
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor:'#D4C7BE',
    },
    // Header Style
    headerContainer: {
      paddingTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    }, 
    iconCaontainer: {
      padding: 10,
      borderRadius: 30,
      backgroundColor: currentTheme.foreground
    },
})

export default Setting;