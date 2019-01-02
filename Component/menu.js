import React from 'react';
import {View,Text,TouchableOpacity,Alert,ImageBackground,StatusBar} from 'react-native';
import MySorage from '../api/storage';
import {userlist,historys} from '../api/api';
import {StackActions, NavigationActions} from 'react-navigation';
import Topt from './TopTitle';


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
       {text:'是',onPress:()=>this.reset('Touchlogin')},
       {text:'否',onPress:this.opntion2Selected}
      ],
      {cancelable:false}
  );
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
    return (<View style={{alignItems:'center',width: '100%', height: '100%',position:'relative'}}>
                 <Topt navigation={this.props.navigation} centerText={'我的'} />
                <View style={{marginTop:7,width:'95%',height:120,backgroundColor:'white',alignItems:'center',justifyContent:'center',elevation:3,borderRadius:5}}>
                  <View style={{flexDirection:'row',width:'95%',justifyContent:'center',alignItems:'center'}}>
                     <Text style={{fontSize:18,color:'#363434'}}>登录名：</Text>
                     <Text style={{fontSize:18,color:'#1296db',fontWeight:'300'}}>{jconfig.userinfo.user?this.state.realname:'暂无'}</Text>
                  </View>
                </View>
             <TouchableOpacity onPress={()=> this.out()} style={{position:'absolute',elevation:2,bottom:30,justifyContent:'center',alignItems:'center',width:'80%',backgroundColor:'#1296db',borderRadius:5,height:40}}>
             <Text style={{color:'white',fontSize:18,fontWeight:'500'}}>退出系统</Text>
            </TouchableOpacity>
            </View>)
  }
}