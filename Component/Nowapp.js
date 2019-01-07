import React from 'react';
import {View,Text,TouchableOpacity,Alert,Image,StatusBar} from 'react-native';
import Title from './Title';


export default class Nowapp extends React.Component{
    render(){
        return(<View>
            <Title navigation={this.props.navigation} centerText={'两票一体化管理系统'}/>
            
        </View>)
    }
}