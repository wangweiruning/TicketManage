import React from 'react';
import Title from './Title';
import {View,Text,TouchableOpacity,Image} from 'react-native';

export default class Litile extends React.Component{
    constructor(props){
        super(props);
        this.state = {

      };
    }

    render(){
        const data= this.props.navigation.state.params.TicketSerialNum;
        return(<View>
              <Title navigation={this.props.navigation} centerText={'信息管理系统'} />
              <Text>   {data}</Text>
            </View>)
    }
}