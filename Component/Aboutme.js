import React from 'react';
import {Text,View,Image,TouchableOpacity} from 'react-native';
import Title from './Title';

export default class Aboutme extends React.Component{
    render(){
        return(<View>
            <Title navigation={this.props.navigation} centerText={'关于我们'}/>
        </View>)
    }

}