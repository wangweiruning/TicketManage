import React from 'react';
import {View} from 'react-native';
import Title from './Title';

export default class Myapp extends React.Component{
    render(){
        return(<View>
             <Title navigation={this.props.navigation} centerText={'关于两票管理'} />
        </View>)
    }
}