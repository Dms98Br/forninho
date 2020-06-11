//#region Import da aplicação

import React, {Component} from 'react'
import {View,
        Text,
        ImageBackground,
        StyleSheet,
        FlatList,
        TouchableOpacity,
        Platform,
        Alert
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import 'moment/locale/pt-br'
//#endregion

//#region Import de arquivos que foram criados
import chamas from '../../assets/imgs/chamas.jpg'
import commonStyles from '../commonStyles'
import Task from '../components/Forninho'
import AddForninho from '../screens/AddRecipes'
import { TextInput } from 'react-native-gesture-handler'
//#endregion

const initialState = { 
    showDoneForninho: true,
    showAddForninho: false,
    visibleForninho:[],
    Recipes: [ ]
}

export default class ListRecipes extends Component{
    state = {
        ...initialState
    }

    componentDidMount = async () =>{
        const stateString = await AsyncStorage.getItem('forninhoState')
        const state = JSON.parse(stateString) || initialState
        this.setState(state, this.filterForninho) 
    }

    toggleFilter = () =>{
        this.setState({showDoneForninho: !this.state.showDoneForninho}, this.filterForninho)
    }

    filterForninho = () =>{
        let visibleForninho = null
        if(this.state.showDoneForninho){
            visibleForninho = [...this.state.Recipes]
        }else{
            const pending = taks => taks.doneAt === null
            visibleForninho = this.state.Recipes.filter(pending)
        }

        this.setState({ visibleForninho })

        AsyncStorage.setItem('forninhoState', JSON.stringify(this.state))
    }

    toggleForninho = RecipesId => {
        const Recipes = [...this.state.Recipes]
        Recipes.forEach(Recipes => {
            if(Recipes.id === RecipesId){
                Recipes.doneAt = Recipes.doneAt ? null : new Date()
            }
        })
        this.setState({ Recipes }, this.filterForninho)
    }

    addForninho = newTask =>{
        if(!newTask.name || !newTask.desc.trim){
            Alert.alert('Dados inválidos','Descrição não informada')
            return
        }
        const Recipes = [...this.state.Recipes]
        Recipes.push({
            id: Math.random(),
            desc: newTask.desc,
            estimateAt: newTask.date,
            //doneAt: null
        })
        this.setState( { Recipes, showAddForninho: false}, this.filterForninho )
    }
    
    deleteTask = id =>{
        const Recipes = this.state.Recipes.filter(taks => taks.id !== id)
        this.setState({ Recipes }, this.filterForninho)
    }

    render(){
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return(
            <View style={styles.container}>
                
                <AddForninho isVisible={this.state.showAddForninho}
                    onCancel={() => this.setState({ showAddForninho: false })} 
                    onSave = {this.addForninho}/>
                
                <ImageBackground source={chamas}
                    style = {styles.background}>   
                    
                    <TextInput style={styles.input}
                    placeholder="Procure sua receita..." 
                       onChangeText = {desc => this.setState({ desc })}
                       value={this.state.desc} />                    
                    
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>FORNIHO</Text>
                        <Text style={styles.subtitle}>{today}</Text>                        
                    </View>                 
                </ImageBackground>
                
                <View style={styles.taskList}>                    
                <TouchableOpacity onPress = {() => this.setState({showAddForninho: true})}>
                <FlatList data={this.state.visibleForninho}                        
                        keyExtractor = {item => `${item.id}`}
                        renderItem={ ( { item } ) => <Task {...item}
                        onToggleForninho={this.toggleForninho} onDelete={this.deleteTask}/>}
                        />
                </TouchableOpacity>
                </View>     

                <TouchableOpacity style={styles.addButton}
                    activeOpacity = {0.7}
                    onPress = {() => this.setState({showAddForninho: true})}>                    
                    <Icon name="plus" size={20}
                        color={commonStyles.colors.secondary}/>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    background:{
        flex: 3
    },
    taskList:{
        flex:7
    },
    titleBar:{
        flex: 1,
        justifyContent: 'center'
    },
    title:{
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 50,        
        marginLeft: 93,
        marginBottom: 20
    },
    input:{
        fontFamily: commonStyles.fontFamily,
        height: 40,
        margin: 15,        
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 6
    },
    subtitle:{
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30
    },
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'flex-end',
        marginTop: Platform.OS === 'ios' ? 40 : 10
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: commonStyles.colors.today,
        justifyContent: 'center',
        alignItems: 'center'
    }
})