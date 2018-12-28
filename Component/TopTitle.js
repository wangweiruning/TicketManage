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
            height:13+StatusBar.currentHeight,
            backgroundColor: '#0390e8',
            flexDirection: 'row',
            justifyContent: 'center',
            elevation:3
        }}>
        <Text style={{color:'white',fontSize:18,fontWeight:'500'}}>{this.props.centerText}</Text>
        </View>)
    }
}