import React from 'react';
import {View,Text,StatusBar} from 'react-native';

export default class TopT extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
        <View style={{
            width: '100%',
            height:10+StatusBar.currentHeight,
            backgroundColor: '#1296db',
            flexDirection: 'row',
            justifyContent: 'center',
        }}>
        <Text style={{color:'white',fontSize:20,fontWeight:'500'}}>{this.props.centerText}</Text>
        </View>)
    }
}