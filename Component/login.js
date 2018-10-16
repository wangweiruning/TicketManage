import React from 'react';
import {View,TouchableOpacity,Text,Alert,ToastAndroid} from 'react-native';
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
        MySorage._getStorage()
         super(props)
         this.state={
                    user:'',
                    pass:'',
                    result:{
                    }
            }
     }


     componentWillUnmount(){
        this.setState = (state,callback)=>{
        return;
      };
      }
     
async submitgo(data){
         const datas ="?form.user="+data.username+"&form.pass="+data.password+"&code="+'50ACD07A6C49F3B9E082EF40461AC6D1'; 
         const result = await login(datas)
         console.log(result.form,'qqqqqqqqqq')
        if(result.form.status == 0){    
            Alert.alert('',result.form.targetresult,[{text:'是',onPress:this.opntion2Selected}
        ])
        }
            else{
                ToastAndroid.show('登录成功', ToastAndroid.SHORT)
                this.props.navigation.dispatch(resetAction);
            }
            this.setState({
                result:JSON.stringify(result),//序列化：转换为一个 (字符串)JSON字符串
            });
            MySorage._sava("isLogin", JSON.stringify({status: true}));
            MySorage._load("isLogin", (data) => {
                let res = JSON.parse(data);
                result.form.status=res.status;
                console.log(res,res.status,'qwrrqwassss')
            });
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
        <View>
           <InputItem placeholder="账号" onChange={(v)=>this.handleInput('user',v)} style={{borderRadius:5,backgroundColor:'white',width:'85%'}}/>
           <InputItem type="password" placeholder="密码" onChange={(v)=>this.handleInput('pass',v)} style={{borderRadius:5,backgroundColor:'white',width:'85%'}}/>
           <TouchableOpacity onPress={()=>this.submitgo({username,password,code:'50ACD07A6C49F3B9E082EF40461AC6D1'})} 
               style={{top:40,justifyContent:'center',alignItems:'center',width:'80%',backgroundColor:'#3e5ed2',borderRadius:5,height:40}}>
          <Text style={{color:'white',fontSize:20}}>登录</Text>
        </TouchableOpacity>
        </View>
        )
    }
}