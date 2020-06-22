import React from 'react'
import {View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Icon from 'react-native-vector-icons/FontAwesome'

import moment from 'moment'
import 'moment/locale/pt-br'

import commonStyles from "../commonStyles";

export default props =>{

    const doneOrNoteStytle = props.doneAt != null ?
        { textDecorationLine: 'line-through' } : {}
    
    const date = props.doneAt ? props.doneAt : props.estimateAt
    const formattedDate = moment(date).locale('pt-br')
        .format('ddd, D [de] MMMM')

    const getRightContent = () =>{
        return (
            <TouchableOpacity style={styles.right}
                onPress={() => props.onDelete && props.onDelete(props.id)}>
                <Icon name="trash" size={30} color='#FFF'/>
            </TouchableOpacity>
        )
    }

    return(
        <Swipeable renderRightActions={getRightContent}>
            <View style = {styles.container}>
                <TouchableWithoutFeedback onPress={() => props.onToggleForninho(props.id)}>
                    <View style={styles.checkContainer}>
                        {getCheckView(props.doneAt)}
                    </View>
                </TouchableWithoutFeedback>                
                    <View>
                        <Text style={[styles.header]}>{props.name}</Text>                        
                        {/* <Text style={styles.subText}>{formattedDate}</Text> */}
                    </View>                
            </View>
        </Swipeable>        
    )
}

function getCheckView(doneAt){
    
    if(doneAt != null){
        return (
            <View style={styles.done}>
                <Icon name='check' size={20}
                color={'#FFF'}></Icon>
            </View>
        )
    } else {
        return (
            <View style={styles.pending}></View>
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