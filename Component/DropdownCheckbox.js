import React from 'react';
import {Checkbox} from 'antd-mobile-rn'
import {View,Text,ScrollView} from 'react-native';


export default class DropdownCheckbox extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <ScrollView style={{backgroundColor:'skyblue'}}>
            {
                this.props.datas.map((v,i)=><View key={i}>
                        <Text>{v.name}</Text>
                        <Checkbox />
                </View>)
            }
            </ScrollView>
        )
    }
}