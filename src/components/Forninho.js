import React from 'react'
import {View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Gravatar } from 'react-native-gravatar'

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
                    <View>

                        <Text style={[styles.name, doneOrNoteStytle]}>{props.name}</Text>                        
                        <Text style={styles.subText}>Tempo de preparo 15m</Text>                                       
                    </View>                
            </View>
        </Swipeable>        
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        borderColor: "#AAA",
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#FFF'
    },
    checkContainer:{
        width:'20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pending:{
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555'
    },
    done:{
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        backgroundColor: '#4D7031',
        alignItems: 'center',
        justifyContent:'center'
    },
    name:{
        marginLeft: 10,
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,        
        fontSize: 15
    },
    subText:{
        marginLeft: 10,
        fontFamily: commonStyles.fontFamily,
        color: '#020202',        
        fontSize: 15
    },
    date:{
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 12 
    },
    right:{
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20
    },
    left:{
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
    },
    excludeIcon:{
        marginLeft: 10
    },
    excludeText:{
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
        margin: 10
    }
})
