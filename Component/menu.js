import React from 'react';
import NavigationBar from './NavigationBar';
import {View,Text,TouchableOpacity, Alert} from 'react-native';


export default class ToastExample extends React.Component {
  constructor(props){
    super(props)
  }
  componentDidMount() {
  }


  render() {
    return (<View style={{alignItems:'center'}}>
      <NavigationBar navigation={this.props.navigation} centertext={'我的'}/>
        <View style={{width:'100%',height:40,backgroundColor:'lightgray',top:10,justifyContent:'center'}}>
          <Text style={{fontSize:20,left:20,color:'black'}}>id：超级管理员</Text>
        </View>
        <TouchableOpacity  style={{top:40,justifyContent:'center',alignItems:'center',width:'80%',backgroundColor:'#3e5ed2',borderRadius:5,height:40}}>
          <Text style={{color:'white',fontSize:20}}>退出</Text>
        </TouchableOpacity>
      </View>);
  }
}