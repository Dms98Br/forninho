//#region Import react
import React, { Component } from 'react'

import {
    Platform,
    Modal,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    ScrollView,
    TextInput,
    StyleSheet,
    TouchableWithoutFeedback,
    Button    
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome' 

import moment, { relativeTimeThreshold } from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker'

//#endregion

import commonStyles from '../commonStyles'

const initialState = { name: '', date: new Date(), desc:[], showDatePicker: false }

export default class AddTask extends Component{

    state = {
        ...initialState
    }

    save = () =>{
        const newTask = {
            name: this.state.name,
            date: this.state.date,            
            desc : this.state.desc
         }
        this.props.onSave && this.props.onSave(newTask)

        this.setState({ ...initialState })
         this.state.desc.length = 0
    }

    getDatePicker = () =>{
        let datePicker = <DateTimePicker 
            value={this.state.date}
            onChange={(_, date) => this.setState({ date, showDatePicker: false})}
            mode='date'/>

        const dateString = moment(this.state.date).format('ddd, D [de] MMMM [de] YYYY')

        if(Platform.OS === 'android'){
            datePicker = (
                <View>
                    <TouchableOpacity onPress={() => this.setState({ showDatePicker: true})}>
                        <Text style={styles.date}>
                            {dateString}
                        </Text>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePicker }
                </View>
            )
        }
                
        return datePicker
    }
    
    addTextInput = (key) => {   
        let textInput = this.state.desc;     
        textInput.push(<TextInput style={styles.input} editable = {false} placeholder="Ingrediente" key={key} />);
        this.setState({ textInput })
      }
    removeTextInput =(key) =>{
        let textInput = this.state.desc;     
        textInput.pop(<TextInput style={styles.input} placeholder="Ingrediente" key={key} />);
        this.setState({ textInput })
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
                <SafeAreaView>
                    <ScrollView>
                        <View style={styles.container}>
                            <Text style={styles.header}>Nova Receita</Text>
                            <TouchableOpacity style={styles.closeButton}
                                    onPress={this.props.onCancel}>
                                    <Icon name="close" size={20}
                                        color={commonStyles.colors.secondary}/>
                                </TouchableOpacity>
                                
                            <TextInput style={styles.input} editable = {false}
                            placeholder="Nome da receita..." 
                            onChangeText = {name => this.setState({ name })}
                            value={this.state.name}/>
                            {this.state.desc.map((value, index) => {
                                return value
                            })}
                            {/* <Text style={styles.date} >{today} </Text> */}
                            <View style={styles.buttons}>     
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
                
                <TouchableWithoutFeedback 
                    onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>

            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    background:{
        flex: 4,
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
        fontFamily: commonStyles.fontFamily,
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