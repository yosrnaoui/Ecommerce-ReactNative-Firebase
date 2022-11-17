import React, {useState,useEffect} from 'react';
import { View,  Text,Image,StyleSheet,TouchableOpacity,FlatList,Keyboard} from 'react-native';
import { firebase } from '../firebase/config'

import Icon from 'react-native-vector-icons/MaterialIcons';

// import theme
import * as theme from '../assets/constants/theme';

const ShoppingCart = ({navigation}) => {

    const [products, setProducts] = useState([])

    const productRef = firebase.firestore().collection('products')

    const renderProduct = () => {
        productRef
            .get()
            .then(
                onSnapshot(
                querySnapshot => {
                    const newProducts = []
                    querySnapshot.forEach(doc => {
                        const product = doc.data()
                        product.id = doc.id
                        newProducts.push(product)
                    });
                    setProducts(newProducts)
                },
                error => {
                    console.log(error)
                }
            ))
    }
   /* firestore()
    .collection("reservations")
    .doc(tripUid)
    .listCollections()
    .then((subCollections) => {
        subCollections.forEach((subCollection) => {
            subCollection
                .get()
                .then((array) => {
                    array.docs.forEach((doc) => {
                        console.log(doc.data());
                    });
                });
        });
    });*/

    return (
        <View style={{flex: 1}}>
            
            <View style={styles.container}>
                {/* Header */}
                {/* Body */}
                    <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={styles.priceText}>this is the Cart Screen</Text>
                    </View>  
                {/* Footer */}
                    <View style={styles.footerContainer}>
                    <TouchableOpacity style={styles.btnContainer} onPress={() =>navigation.navigate("CheckOut")}>
                        <Text style={styles.btnText}>CHECKOUT</Text>
                    </TouchableOpacity>
                </View>   
                { products && 
                products.map &&
                ( 
               
                        <View style={styles.listContainer}>
                    <FlatList
                        data={products}
                        renderItem={renderProduct}
                        keyExtractor={(product) => product.id}
                        removeClippedSubviews={true}
                    />
                </View>
                
                )} 
            </View> 
        </View>
    );
};
/*
import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
<FlatList
    data={products}
    renderItem={renderProduct}
    keyExtractor={(item) => item.id}
    removeClippedSubviews={true}
/>

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

    const renderEntity = ({item, index}) => {
        return (
            <View style={styles.entityContainer}>
                <Text style={styles.entityText}>
                    {index}. {item.text}
                </Text>
            </View>
        )
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
            { entities && (
                <View style={styles.listContainer}>
                    <FlatList
                        data={entities}
                        renderItem={renderEntity}
                        keyExtractor={(item) => item.id}
                        removeClippedSubviews={true}
                    />
                </View>
            )}
        </View>
    )
}
*/



const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor:'#D4C7BE',
    },
    header: {
        height: 70,
        padding: 200,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    priceText: {
        fontWeight: 'bold',
        fontSize: theme.sizes.h5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:45,
    },
    footerContainer: {
      marginTop:400,
      padding: 20,
    },
    btnContainer: {
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
    btnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    listContainer: {
        marginTop: 20,
        padding: 20,
    },
    entityContainer: {
        marginTop: 16,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        paddingBottom: 16
    },
    entityText: {
        fontSize: 20,
        color: '#333333'
    }
});

export default ShoppingCart;