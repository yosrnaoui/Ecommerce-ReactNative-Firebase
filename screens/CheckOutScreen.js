import React, {useState,useEffect} from 'react';
import {  StyleSheet, View, Text, TouchableOpacity,TextInput,Keyboard,Image} from 'react-native';
import * as theme from '../assets/constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../firebase/config';
// const with the current theme (dark / light)
const currentTheme = theme.colors.light

const ChekOut = ({navigation}) => {

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [zip, setZip] = useState('')

    
    const [orders, setOrders] = useState([])

    const orderRef = firebase.firestore().collection('orders')
    

    useEffect(() => {
        orderRef
            .orderBy('createdAt', 'desc')
            .onSnapshot(
                querySnapshot => {
                    const newOrders = []
                    querySnapshot.forEach(doc => {
                        const order = doc.data()
                        order.id = doc.id
                        newOrders.push(order)
                    });
                    setOrders(newOrders)
                },
                error => {
                    console.log(error)
                }
            )
    }, [])

    
    const onOrderButtonPress = () => {
        if ( fullName.length > 0 && email.length > 0 && phone.length > 0 && address.length > 0 && city.length > 0 && zip.length > 0) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                name: fullName,
                mail: email,
                phone: phone,
                address: address,
                city: city,
                zip: zip,
                createdAt: timestamp,
            };
            orderRef
                .add(data)
                .then(_doc => {
                    setFullName('')
                    setEmail('')
                    setPhone('')
                    setAddress('')
                    setCity('')
                    setZip('')
                    Keyboard.dismiss()
                    navigation.navigate('Home')
                })
                .catch((error) => {
                    alert(error)
                });
        }
    }

    return(
        <View style={{flex: 1}}>
            <View style={styles.container}>
                {/* ShoppingCart */}
                <View style={styles.headerContainer}>
                    <View>
                        <Image source={require('../assets/images/brand.png')}/>
                    </View>
                </View>
                {/* Body */}
                <View style={styles.bodyContainer}>
                <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Full Name'
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='phone number'
                    onChangeText={(text) => setPhone(text)}
                    value={phone}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Enter your adress'
                    onChangeText={(text) => setAddress(text)}
                    value={address}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Enter your city'
                    onChangeText={(text) => setCity(text)}
                    value={city}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='enter your zip code'
                    onChangeText={(text) => setZip(text)}
                    value={zip}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={onOrderButtonPress}>
                    <Text style={styles.buttonTitle}>Order</Text>
                </TouchableOpacity>
                </KeyboardAwareScrollView>
                </View>
            </View>
        </View>
            
    )
}
/*
import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'

export default function HomeScreen(props) {

    const [entityText, setEntityText] = useState('')
    const [entities, setEntities] = useState([])

    const entityRef = firebase.firestore().collection('entities')
    const userID = props.extraData.id

    useEffect(() => {
        entityRef
            .where("authorID", "==", userID)
            .orderBy('createdAt', 'desc')
            .onSnapshot(
                querySnapshot => {
                    const newEntities = []
                    querySnapshot.forEach(doc => {
                        const entity = doc.data()
                        entity.id = doc.id
                        newEntities.push(entity)
                    });
                    setEntities(newEntities)
                },
                error => {
                    console.log(error)
                }
            )
    }, [])

    const onAddButtonPress = () => {
        if (entityText && entityText.length > 0) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                text: entityText,
                authorID: userID,
                createdAt: timestamp,
            };
            entityRef
                .add(data)
                .then(_doc => {
                    setEntityText('')
                    Keyboard.dismiss()
                })
                .catch((error) => {
                    alert(error)
                });
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Add new entity'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEntityText(text)}
                    value={entityText}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
           
            )}
        </View>
    )
}
*/

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
        alignItems: 'center'
    },
    title: {

    },
    logo: {
        flex: 1,
        height: 120,
        width: 90,
        alignSelf: "center",
        margin: 30
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    button: {
        backgroundColor: 'grey',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        marginBottom: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "#788eec",
        fontWeight: "bold",
        fontSize: 16
    },
    // footer 
    footerContainer: {
        padding: 20,
        backgroundColor:'#D4C7BE',
    },
    btnContainer: {
        flex: 1,
        padding: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        flexDirection: 'row',
        backgroundColor:'#EAECEE'
    },
    btnText: {
        fontWeight: 'bold',
    }
})

export default ChekOut;