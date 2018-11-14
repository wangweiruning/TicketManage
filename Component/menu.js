import React from 'react';
import NavigationBar from './NavigationBar';
import {View,Text,TouchableOpacity,Alert} from 'react-native';
import MySorage from '../api/storage';
import {userlist,historys} from '../api/api';
import * as Animatable from 'react-native-animatable';
import {StackActions, NavigationActions} from 'react-navigation';
export default class ToastExample extends React.Component {
  constructor(props){
    super(props)
    this.state={
      user:'',
      list:[],
      realname:''
    }
  }
 
 async componentWillMount(){
    let x =await userlist();
    let d = `?form.tree_node_operation=0`;
    let g =await historys(d);
    this.setState({
      list:x.form.paramAllList,
      user:g.form.userId
    })
    this.real();
  }



  real(){
      let r = this.state.list;
      let y = this.state.user;
      let e = r.findIndex((v)=>{
        if(y==v.userid){
           this.setState({
            realname:v.realname
           })
        }
      })
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
    const {navigate} = this.props.navigation;
    return (<View style={{alignItems:'center'}}>
      <NavigationBar navigation={this.props.navigation} centertext={'我的'}/>
      <Animatable.View style={{flexDirection:'row',width:'95%',borderRadius:10,height:80,backgroundColor:'lightgray',top:10,justifyContent:'center',alignItems:'center'}} useNativeDriver animation="fadeInDown" easing="ease-out-quart">
          <Text style={{fontSize:20,color:'black'}}>登录名：</Text>
          <Text style={{fontSize:20,color:'black',fontWeight:'500'}}>{jconfig.userinfo.user?this.state.realname:'暂无'}</Text>
      </Animatable.View>
        <TouchableOpacity onPress={()=> this.out()} style={{elevation:2,top:40,justifyContent:'center',alignItems:'center',width:'80%',backgroundColor:'#00a6e7',borderRadius:5,height:40}}>
          <Text style={{color:'white',fontSize:20,fontWeight:'500'}}>退出系统</Text>
        </TouchableOpacity>
      </View>);
  }
}