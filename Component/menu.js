import React from 'react';
import NavigationBar from './NavigationBar';
import {View,Text,TouchableOpacity,Alert} from 'react-native';
import HttpUtils from '../api/Httpdata';
import MySorage from '../api/storage';
import {StackActions, NavigationActions} from 'react-navigation';

export default class ToastExample extends React.Component {
  constructor(props){
    super(props)
    this.state={
      user:'2'
    }
  }
  componentDidMount() {
  }

  
  out(){
    Alert.alert(
      '','确定退出吗？',
      [
       {text:'是',onPress:()=>this.reset('login')},
       {text:'否',onPress:this.opntion2Selected}
      ]
  );
  }

  outs(){
    const {navigate} = this.props.navigation;
    navigate('login')
  }

  reset(routeName="",params={}){
    window.jconfig.userinfo={}
    MySorage._remove('userinfo')
    this.props.navigation.dispatch(StackActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({routeName,params})
        ]
    }))
}

  render() {
    if(this.state.user='2'){}
    const {navigate} = this.props.navigation;
    return (<View style={{alignItems:'center'}}>
      <NavigationBar navigation={this.props.navigation} centertext={'我的'}/>
        <View style={{width:'100%',height:40,backgroundColor:'lightgray',top:10,justifyContent:'center',alignItems:'center'}}>
          <Text style={{fontSize:20,color:'black'}}>权限等级：超级管理员</Text>
        </View>
        <TouchableOpacity onPress={()=>window.jconfig.userinfo={}?this.outs():this.out()} style={{top:40,justifyContent:'center',alignItems:'center',width:'80%',backgroundColor:'#3e5ed2',borderRadius:5,height:40}}>
          <Text style={{color:'white',fontSize:20}}>{window.jconfig.userinfo={}?'登录':'退出'}</Text>
        </TouchableOpacity>
      </View>);
  }
}