import React from 'react';
import Title from './Title';
import {View,Text,ScrollView,TouchableOpacity} from 'react-native';

export default class TicketModel extends React.Component{
    render(){
        return(
            <View>
            <Title navigation={this.props.navigation} centerText={this.props.navigation.state.params.name+'模板类型'}/>
               
            </View>
        )
    }
}