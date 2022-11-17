import React, {useState,useEffect} from 'react';
import { View,  Text,Image,StyleSheet,TouchableOpacity,Modal, FlatList,Keyboard} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { firebase } from '../firebase/config';

// import theme
import * as theme from '../assets/constants/theme';
import ShoppingCart from '../screens/CartScreen';
import Radio from './radioButton';

const ProductModal = (props) => {
    
    const background = props.item.background

    const [products, setProducts] = useState([])

    const productID = props.item.id
    const productName = props.item.name
    const productPrice = props.item.price

    const productRef = firebase.firestore().collection('products')

    useEffect(() => {
        productRef
            .where("id", "==", productID)
            .orderBy('addedAt', 'desc')
            .onSnapshot(
                querySnapshot => {
                    const newProducts = []
                    querySnapshot.forEach(doc => {
                        const product = doc.data()
                        product.id = doc.id
                        newProducts.push(product)
                        alert("Product added.")
                    });
                    setProducts(newProducts)
                },
                error => {
                    console.log(error)
                }
            )
    }, [])

    const onAddButtonPress = () => {
        
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                id: productID,
                name : productName,
                price : productPrice,
                addedAt: timestamp,
            };
            productRef
                .add(data)
                .then(_doc => {
                    Keyboard.dismiss()
                })
                .catch((error) => {
                    alert(error)
                });
        
    }


    return (
        <View style={{flex: 1}}>
            <View style={[styles.container, {backgroundColor: background}]}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={props.closeModal}>
                        <Icon name="keyboard-arrow-left" size={30} color={theme.colors.light.foreground} />
                    </TouchableOpacity>
                </View>

                {/* Body */}
                <View style={styles.imgContainer}>
                    <Image source={props.item.image} style={{width: 220, height: 220}} />
                </View>
                <View style={styles.detailsContainer}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <View style={styles.sizesContainer}>
                            <Radio />
                        </View>
                        <Text style={styles.priceText}>{props.item.price}</Text>
                    </View>
                    <Text style={styles.descriptionText}>{props.item.description}</Text>
                </View>

                {/* Footer */}
                <View style={styles.footerContainer}>
                    <TouchableOpacity 
                    style={[styles.btnContainer, {flex: 1,backgroundColor: background, borderColor: background}]}
                    onPress={onAddButtonPress} >
                        <Text style={styles.btnText}>ADD TO CARD</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
};


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
    },
    header: {
        height: 70,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    imgContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    detailsContainer: {
        flex: 1,
        padding: 20,
        paddingTop: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: theme.colors.light.background
    },
    sizesContainer: {
        flexDirection: 'row'
    },
    sizeCircleContainer: {
        width: 30, 
        height: 30,
        marginRight: 10,
        borderRadius: 30,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: theme.colors.gray,
        backgroundColor: theme.colors.clouds,
        flexDirection: 'row'
    },
    priceText: {
        fontWeight: 'bold',
        fontSize: theme.sizes.h5,
    },
    descriptionText: {
        marginTop: 20,
        fontWeight: '900',
        fontSize: theme.sizes.h4,
        color: theme.colors.gray
    },
    footerContainer: {
        padding: 20,
        flexDirection: 'row',
        backgroundColor: theme.colors.light.background
    },
    btnContainer: {
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    btnText: {
        fontWeight: 'bold',
        fontSize: theme.sizes.h3
    }
});

export default ProductModal ;