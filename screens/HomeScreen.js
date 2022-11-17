import React,{useState} from 'react';
import {  StyleSheet, View, Text, TouchableOpacity, TextInput,Image,Modal} from 'react-native';
import * as theme from '../assets/constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ShoppingCart from './CartScreen';
import { firebase } from '../firebase/config';
// const with the current theme (dark / light)
const currentTheme = theme.colors.light

const Home = ({navigation}) => {
  
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

                {/* Header */}
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")} >
                    <View>
                        <Image source={require('../assets/images/brand.png')}/>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconCaontainer} onPress={() => navigation.navigate("ShoppingCart")}>
                        <Icon name="shopping-cart" color={currentTheme.background} size={25} />
                    </TouchableOpacity>
                </View>
                {/* Search */}
                <View style={styles.searchContainer}>
                    <Icon name="search" color={theme.colors.gray} size={25} />
                    <TextInput 
                    style={styles.textInputContainer} 
                    placeholder="Search.." 
                    placeholderTextColor={theme.colors.gray} />
                </View>
                {/* Body*/}
                <View style={styles.bodyContainer}>
                    <TouchableOpacity style={styles.womenContainer} onPress={() =>navigation.navigate("Women")}>
                    <Text style={styles.title}>Women</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menContainer} onPress={() =>navigation.navigate("Men")}>
                    <Text style={styles.title}>Men</Text>
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
      padding:10,
      borderRadius: 30,
      backgroundColor: currentTheme.foreground
    },
    // Search Style
    searchContainer: {
      paddingLeft: 10,
      marginTop: 10,
      flexDirection: 'row',
      borderRadius: 5,
      backgroundColor:'#EAECEE'
    },
    textInputContainer: {
      flex: 1,
      padding:10,
    },
    // Body Style
    bodyContainer: {
      flex:1,
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginTop : 15,
    },
    womenContainer :{
      borderRadius:5,
      alignItems:'center',
    },
    menContainer :{
      borderRadius:5,
      alignItems:'center',
    },
    title: {
      fontWeight: 'bold',
      color:'whitesmoke',
      height:50,
      width:150,
      fontSize:35,
      paddingLeft:20,
    },
})

export default Home;