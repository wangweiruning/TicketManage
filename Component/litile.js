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
        return(<View>
              <Title navigation={this.props.navigation} centerText={'信息管理系统'} />
            </View>)
    }
}