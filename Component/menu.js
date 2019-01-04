import React from 'react';
import {View,Text,TouchableOpacity,Alert,Image,StatusBar} from 'react-native';
import MySorage from '../api/storage';
import TouchID from 'react-native-touch-id';
import {userlist,historys} from '../api/api';
import {StackActions, NavigationActions} from 'react-navigation';
import Topt from './TopTitle';


export default class ToastExample extends React.Component {
  constructor(props){
    super(props)
    this.state={
      bools:null,
      user:'',
      tou:false,
      list:[],
      realname:''
    }
  }
 
       componentWillMount(){
        TouchID.isSupported().then(biometryType => {
          // Success code
        })
        .catch(error => {
         // Failure code
          this.setState({
            tou:true
          })
        });
        
       }

 async componentDidMount(){
    let x =await userlist();
    let d = `?form.tree_node_operation=0`;
    let g =await historys(d);
    this.setState({
      list:x.form.paramAllList,
      user:g.form.userId
    })
    this.real();
    MySorage._load("seting",(ress) => {
      this.setState({
        bools:ress
      })
     })
    this.viewDidAppear = this.props.navigation.addListener(
      'willFocus', async(obj)=>{
          MySorage._load("seting",(ress) => {
                  this.setState({
                    bools:ress
                  })
          })
      }
  );
  }

  componentWillUnmount(){
    this.viewDidAppear.remove();
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
    let boll = this.state.bools;
    let ttt = this.state.tou
    Alert.alert(
      '','确定退出吗？',
      [
       {text:'是',onPress:()=>ttt?this.resets('login'):this.reset(boll?'login':'Touchlogin')},
       {text:'否',onPress:this.opntion2Selected}
      ],
      {cancelable:false}
  );
  }

  resets(routeName="",params={}){
    window.jconfig.info={}
    MySorage._remove('userinfo')
    this.props.navigation.dispatch(StackActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({routeName,params})
        ]
    }))
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
             <TouchableOpacity style={{flexDirection:'row',marginTop:20,width:'100%',height:50,alignItems:'center',backgroundColor:'white'}} onPress={()=>this.props.navigation.navigate('Seting')}>
              <Text style={{marginLeft:10,color:'black',flex:1}}>设置</Text>
              <Image source={require('../images/go1.png')} style={{width:15,height:15}}/>
             </TouchableOpacity>
             <TouchableOpacity onPress={()=> this.out()} style={{position:'absolute',elevation:2,bottom:30,justifyContent:'center',alignItems:'center',width:'80%',backgroundColor:'#1296db',borderRadius:5,height:40}}>
               <Text style={{color:'white',fontSize:18,fontWeight:'500'}}>退出系统</Text>
             </TouchableOpacity>
             </View>)
      }
}