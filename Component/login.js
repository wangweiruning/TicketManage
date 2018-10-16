import React from 'react';
import {View,TouchableOpacity,Text} from 'react-native';
import {InputItem} from 'antd-mobile-rn';
import {login} from '../api/api';

export default class Login extends React.Component{
     constructor(props){
         super(props)
         this.state={
                    user:'',
                    pass:'',
                    result:{
                    }
            }
     }
     
    async submitgo(data){
         const datas ="?form.user="+data.username+"&form.pass="+data.password+"&code="+'50ACD07A6C49F3B9E082EF40461AC6D1'; 
         const result = await login(datas)

         console.log(result)
            if(data.username!=result.form.user || data.password!=result.form.pass){
                alert(result.form.targetresult)
            }
            else{
                alert(result.form.targetresult)
            }
            this.setState({
                result:JSON.stringify(result),//序列化：转换为一个 (字符串)JSON字符串
            });
            console.log(result,'qqqqqqqqqq')
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