import React from 'react';
import { StackNavigator } from "react-navigation";
import TabNavigator from 'react-native-tab-navigator';
import {View,Text} from 'react-native';

export default class Title extends React.Component{
    static navigationOptions = ({ navigation }) => ({  
        title: "贵金开在线",
        headerStyle:{backgroundColor:"#e0e0e0",height:45}
    });

    render(){
        return(<View>
              <Text >1111111111111</Text>
            </View>)
    }
}

