//#region Import react
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
    Keyboard    
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome' 

import moment, { relativeTimeThreshold } from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker'

//#endregion

import commonStyles from '../commonStyles'

const initialState = { name: '', date: new Date(),desc: '', 
    categoria: '', ingredientes: [] , showDatePicker: false }
let textInput=[]
export default class AddRecipes extends Component{
    
    state = {
        ...initialState
    }

    save = () =>{
        const newTask = {
            name: this.state.name,
            date: this.state.date,            
            ingredientes : this.state.ingredientes
         }
        this.props.onSave && this.props.onSave(newTask)        
        this.setState({ ...initialState })        
        this.state.ingredientes = 0
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
//#region Dynamic input text
    addTextInput = (index) => {   
        textInput.push(<TextInput style={styles.input}
        onChangeText={(ingredientes) => this.addValues(ingredientes, index)
        } 
        placeholder="Ingrediente..." key={index}/>);
        this.setState({ textInput });
    }
    addValues = (text, index) => {
        let dataArray = this.state.ingredientes;
        let checkBool = false;        
        if (dataArray.length !== 0){
            dataArray.forEach(element => {
            if (element.index === index ){
              element.text = text;
              checkBool = true;              
            }
          });
        }
        if (checkBool){
        this.setState({
          ingredientes: this.state.ingredientes 
        });        
      }
      else {        
        this.state.ingredientes.push({'text':text,'index':index});
        this.setState({
          ingredientes: this.state.ingredientes                    
        });            
      }
      }
    removeTextInput =(key) =>{
        
        textInput.pop(<TextInput style={styles.input} placeholder="Ingrediente" key={key} />);
        this.setState({ textInput })
    }
//#endregion

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

                            <TextInput style={styles.input}
                            placeholder="Nome da receita..." 
                            onChangeText = {name => this.setState({ name })}
                            value={this.state.name}
                            onSubmitEditing={Keyboard.dismiss}/>

                            {textInput.map((value) => {
                                    return value
                            })}
                            <TextInput placeholder=''
                                onChangeText = {ingredientes => this.setState({ingredientes})}
                                //value={this.state.}
                                ></TextInput>
                            <Text style={styles.date} >{today} </Text>
                            <View style={styles.buttons}>     

                                <TouchableOpacity style={styles.addButton}
                                    activeOpacity = {0.7}
                                    onPress={() => this.addTextInput( textInput.length )}>
                                    <Icon name="plus" size={20}
                                        color={commonStyles.colors.secondary}/>
                                </TouchableOpacity>
                                
                                <TouchableOpacity style={styles.removeButton}
                                    activeOpacity = {0.7}
                                    onPress={() => this.removeTextInput(textInput.length)}>
                                    <Icon name="minus" size={20}
                                        color={commonStyles.colors.secondary}/>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={this.props.onCancel}>
                                    <Text style={styles.button}>Cancelar</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={this.save}>
                                    <Text style={styles.button}>Salvar</Text>    
                                </TouchableOpacity>

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
        color: '#111111',
        fontFamily: commonStyles.fontFamily,
        height: 40,
        margin: 15,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 6
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