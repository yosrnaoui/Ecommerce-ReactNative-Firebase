import React, {useState} from 'react';
import {  StyleSheet, View, Text, TouchableOpacity, FlatList,Modal,Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as theme from '../assets/constants/theme';
import ProductComponent from '../components/productsComponents';
import * as Products from '../assets/constants/products';
import ShoppingCart from './CartScreen';
// const with the current theme (dark / light)
const currentTheme = theme.colors.light

const Men = ({navigation}) => {

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
                    <TouchableOpacity style={styles.iconCaontainer} onPress={() => navigation.navigate("ShoppingCart")}>
                        <Icon name="shopping-cart" color={currentTheme.background} size={25} />
                    </TouchableOpacity>
                </View>
                {/* Body */}
                <View style={styles.bodyContainer}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={Products.menClothes}
                        numColumns={2}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => {
                            return (
                                <ProductComponent item={item} />
                            )
                        }} 
                    />
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
    // Body Style
    bodyContainer: {
        flex: 1,
        marginTop: 20,
    }
})

export default Men;