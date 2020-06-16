//#region Import react
import React, { Component } from 'react'

import {
    Platform,
    Modal,
    Text,
    View,
    TouchableOpacity,
    FlatList, 
    TextInput,
    StyleSheet,
    TouchableWithoutFeedback,
    Button    
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome' 

import ResultItem from "../components/ResultItem"
import moment, { relativeTimeThreshold } from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker'

//#endregion

import commonStyles from '../commonStyles'
//var someText = await AsyncStorage.getItem('forninhoState');
const initialState = { name: '', date: new Date(), desc: [], showDatePicker: false }

export default class AddTask extends Component{

    state = {
        ...initialState
    }

    render(){
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return(
            <Modal transparent={true} 
                visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType='slide'>                
                <TouchableWithoutFeedback 
                    onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
                    
                        <View style={styles.container}>
                            <Text style={styles.header}>{ResultItem.name}</Text>
                            <TouchableOpacity style={styles.closeButton}
                                    onPress={this.props.onCancel}>
                                    <Icon name="close" size={20}
                                        color={commonStyles.colors.secondary}/>
                            </TouchableOpacity>
                            <ResultItem style={styles.header}/>
                            
                           {/* <Text style={styles.date} >{today} </Text> */}

                        </View>

                <TouchableWithoutFeedback 
                    onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>

            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    ResultItem:{
        flex: 4
    },
    background:{
        flex: 4,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    taskList:{
        flex:7
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
        fontSize: 23
    },
    ingredients:{
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        color: '#000303',
        height: 40,
        margin: 15,
        backgroundColor: 'rgba(0, 0, 4, 0.05)',
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
    closeButton: {
        position: 'absolute',
        right: 5,
        top: 15,
        width: 30,
        height: 30,
        borderRadius: 25,
        backgroundColor: commonStyles.colors.today,
        justifyContent: 'center',
        alignItems: 'center'
    }
})