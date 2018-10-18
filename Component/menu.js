import React from 'react';
import NavigationBar from './NavigationBar';
import {View,Text,TouchableOpacity,Alert} from 'react-native';
import {userlist} from './../api/api'
import MySorage from '../api/storage';
import {StackActions, NavigationActions} from 'react-navigation';

export default class ToastExample extends React.Component {
  constructor(props){
    super(props)
    this.state={
      user:'2',
      list:{},
    }
  }
  async componentDidMount() {
    let id = jconfig.userinfo.user;
    let jack = '?form.paramAllList.userid='+id
    let list = await userlist(jack);
    console.log("======>",list);
    this.xunahn(list.form.paramAllList)
  }

  xunahn(sss){
    let s = sss;
    let itemsss= [];
    
    let index = s.findIndex((item)=>{
      console.log(`${item.realname}===>${jconfig.userinfo.user}`);
        return (item.userid == jconfig.userinfo.id) || (item.realname == jconfig.userinfo.user);
    });

    console.log("index ====>",index);

     

    for (let index = 0; index < s.length; index++) {
        const element = s[index];
        if (jconfig.userinfo.user!=element.userid) {
        } else {
            itemsss.push(element);
        }
    }
    this.setState({
         list:itemsss[0]
    })
    console.log(itemsss[0],"33333333333333333333333")
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
    window.jconfig.info={}
    MySorage._remove('userinfo')
    this.props.navigation.dispatch(StackActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({routeName,params})
        ]
    }))
}

  render() {
    console.log(jconfig.userinfo,'jjjjjjjjjjjjjjqqqqqqqqqqqqqqqqqqqqqqqqqqq')
    if(this.state.user='2'){}
    const {navigate} = this.props.navigation;
    return (<View style={{alignItems:'center'}}>
      <NavigationBar navigation={this.props.navigation} centertext={'我的'}/>
        <View style={{width:'100%',height:40,backgroundColor:'lightgray',top:10,justifyContent:'center',alignItems:'center'}}>
          <Text onPress={()=>this.xunahn()} style={{fontSize:20,color:'black'}}>
            id：{jconfig.userinfo.user}
          </Text>
        </View>
        <TouchableOpacity onPress={()=> this.out()} style={{top:40,justifyContent:'center',alignItems:'center',width:'80%',backgroundColor:'#3e5ed2',borderRadius:5,height:40}}>
          <Text style={{color:'white',fontSize:20}}>退出</Text>
        </TouchableOpacity>
      </View>);
  }
}