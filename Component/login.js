import React from 'react';
import {View,TouchableOpacity,Text,Alert,ToastAndroid,Platform,BackHandler,DeviceEventEmitter} from 'react-native';
import {InputItem} from 'antd-mobile-rn';
import {login} from '../api/api';
import MySorage from '../api/storage';
import {StackActions, NavigationActions} from 'react-navigation';
const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Tab' })],
  });

export default class Login extends React.Component{
     constructor(props){
         super(props);
         MySorage._getStorage();
         this.state={
            user:'techlab',
            pass:'Whu2008',
            result:{}
        }
     }

     componentDidMount () {
        MySorage._getStorage()
            // 添加监听进入登陆页然后禁止用户点击返回键返回主页面
            // this.viewDidAppear = this.props.navigation.addListener(
            //     'willFocus',(obj)=>{
            //         if (Platform.OS === 'android') {
            //             BackHandler.addEventListener("hardwareBackPress", this.onBackClicked);
            //         }
            //     }
            //  );
    
            //  // 添加监听登陆页界面被销毁之后恢复返回键的效果
            //  this.viewDidAppear1 = this.props.navigation.addListener(
            //     'willBlur',(obj)=>{
            //         if (Platform.OS === 'android') {
            //             BackHandler.removeEventListener("hardwareBackPress", this.onBackClicked)
            //         }
            //     }
            //  );
     } 

     onBackClicked = () => {
        return true;
    }
     
async submitgo(data){
        try{
         const datas ="?form.user="+data.username+"&form.pass="+data.password+"&code="+'50ACD07A6C49F3B9E082EF40461AC6D1'; 
         const result = await login(datas)
         if(result.form.status == 0){    
             Alert.alert('',result.form.targetresult,[{text:'是',onPress:this.opntion2Selected}])
          }
             else{
                console.log(result.form)
                window.jconfig.userinfo=result.form;
                MySorage._sava("userinfo", JSON.stringify(result.form));
                ToastAndroid.show(result.form.targetresult,ToastAndroid.SHORT)
                this.props.navigation.dispatch(resetAction);
             }
             this.setState({
                 result:JSON.stringify(result),//序列化：转换为一个 (字符串)JSON字符串
             });
        }catch(e){
            alert("服务器开小差了~~，请联系管理员")
            console.log("promisr:",e);
        }
            
            
     }

     handleInput(k, v){
        this.setState({
            [k]: v
        });
    }
      
    render(){
        
        let username = this.state.user;
        let password = this.state.pass;
        return(
        <View style={{alignItems:'center'}}>
           <InputItem placeholder="账号" defaultValue={this.state.user} onChange={(v)=>this.handleInput('user',v)} style={{borderRadius:5,backgroundColor:'white',width:'85%',top:10}}/>
           <InputItem type="password" defaultValue={this.state.pass} placeholder="密码" onChange={(v)=>this.handleInput('pass',v)} style={{borderRadius:5,backgroundColor:'white',width:'85%',top:20}}/>
           <TouchableOpacity onPress={()=>this.submitgo({username,password,code:'50ACD07A6C49F3B9E082EF40461AC6D1'})} 
               style={{top:40,justifyContent:'center',alignItems:'center',width:'80%',backgroundColor:'#3e5ed2',borderRadius:5,height:40}}>
          <Text style={{color:'white',fontSize:20}}>登录</Text>
        </TouchableOpacity>
        </View>
        )
    }
}