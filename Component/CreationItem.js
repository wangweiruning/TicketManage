import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    ListView,
    TouchableHighlight,
    Alert,
    Dimensions,
    ActivityIndicator,
    RefreshControl,
  } from 'react-native';

  export default class CreationItem extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const {row ,navigation} = this.props;
        return (
            <View style={{marginTop:10,display:'flex',borderBottomColor:"red",borderWidth:1,borderStyle:'solid'}}>
            <Text style={{textAlign:"center"}}>{row.TemplateContentID}</Text>
            </View>
        )
    }
}