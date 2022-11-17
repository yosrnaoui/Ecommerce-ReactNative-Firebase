import React, {useState} from 'react';
import { View,  Text,Image,StyleSheet,TouchableOpacity,Modal} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

// import theme
import * as theme from '../assets/constants/theme';

const ShoppingCart = (props) => {

    const [bagVisible, setBagVisible] = useState(false)

    const ToggleBagVisible = () => {
        setBagVisible(!bagVisible)
    }
    return (
        <View style={{flex: 1}}>
            <Modal 
                animationType="slide" 
                visible={bagVisible}
                /*onRequestClose={() => ToggleBagVisible()}*/>
                    <ShoppingCart closeModal={() => ToggleBagVisible()} />
            </Modal>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={props.closeModal}>
                        <Icon name="keyboard-arrow-left" size={30} color={theme.colors.light.foreground} />
                    </TouchableOpacity>
                </View>
                {/* Body */}
                    <View style={{ justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={styles.priceText}>this is the Cart Screen</Text>
                    </View>  
                {/* Footer */}
                    <View style={styles.footerContainer}>
                    <TouchableOpacity style={styles.btnContainer} >
                        <Text style={styles.btnText}>CHECKOUT</Text>
                        <Icon name="keyboard-arrow-right" size={30} color={theme.colors.light.foreground} />
                    </TouchableOpacity>
                </View>    
            </View> 
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor:'#D4C7BE',
    },
    header: {
        height: 70,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    priceText: {
        fontWeight: 'bold',
        fontSize: theme.sizes.h5,
    },
    footerContainer: {
      marginTop:400,
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
      backgroundColor:'pink'
    },
    btnText: {
      fontWeight: 'bold',
      fontSize: theme.sizes.h3
    }
});

export default ShoppingCart;