import React from 'react';
import {Text,View,Image,TouchableOpacity,ImageBackground,StatusBar,Alert} from 'react-native';
import Topt from './TopTitle';

export default class AddNewT extends React.Component{
    render(){
        return(<View>
              <Topt navigation={this.props.navigation} centerText={'新建两票'}/>
        </View>)
    }
}