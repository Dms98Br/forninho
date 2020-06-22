//#region Imports
import React, { Component } from 'react'

import {
    Platform,
    Modal,
    Text,
    View,
    TouchableOpacity,    
    SafeAreaView,
    ScrollView,
    TextInput,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,    
    Alert
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-community/async-storage'
import commonStyles from '../commonStyles'

//#endregion





export default class GetRecipes extends Component{

    render(){
        return(
            <Modal transparent={true} 
            visible={this.props.isVisible}
            onRequestClose={this.props.onCancel}
            animationType='slide'>
                <TouchableWithoutFeedback 
                    onPress={this.props.onCancel}>
                    <View style={styles.background}></View>                
                </TouchableWithoutFeedback>
                <SafeAreaView>
                    <View style={styles.container}>
                        <Text style={styles.header}>Em desenvolvimento</Text>                        
                        
                    </View>
                </SafeAreaView>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    background:{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'        
    },
    container:{                
        backgroundColor:'#FFF'
    },
    header:{
        fontFamily: commonStyles.fontFamily,
        backgroundColor: commonStyles.colors.today,
        color: commonStyles.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 20
    },
    input:{
        color: 'green',
        fontFamily: commonStyles.fontFamily,
        height: 40,
        margin: 15,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 6,
        
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: commonStyles.colors.today
    },
    date:{        
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        marginLeft: 15
    },
    addButton: {
        position: 'absolute',
        left: 30,
        bottom: 10,
        width: 30,
        height: 30,
        borderRadius: 25,
        backgroundColor: commonStyles.colors.today,
        justifyContent: 'center',
        alignItems: 'center'
    },
    removeButton: {
        position: 'absolute',
        left: 70,
        bottom: 10,
        width: 30,
        height: 30,
        borderRadius: 25,
        backgroundColor: commonStyles.colors.today,
        justifyContent: 'center',
        alignItems: 'center'
    }
})