import React from 'react';
import {View,TouchableOpacity,Text} from 'react-native';
import {InputItem} from 'antd-mobile-rn';
import HttpUtils from '../api/Httpdata';


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
     
     submitgo(url,data){
        // url = url +"?form.user="+data.username+"&form.pass="+data.password+"&code="+'50ACD07A6C49F3B9E082EF40461AC6D1';
        HttpUtils.post(url,data)
        .then(result=>{
            if(data.username!=result.form.user){
                alert(result.form.targetresult)
            }
            this.setState({
                result:JSON.stringify(result),//序列化：转换为一个 (字符串)JSON字符串
            });
            console.log(result,'qqqqqqqqqq')
        })
        .catch(error=> {
            this.setState({
                result: JSON.stringify(error),//把错误信息格式化为字符串
            })
        })
        
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
           <TouchableOpacity onPress={()=>this.submitgo('http://59.172.204.182:8030/ttms/common/login_checkuser.action',{username,password,code:'50ACD07A6C49F3B9E082EF40461AC6D1'})} 
               style={{top:40,justifyContent:'center',alignItems:'center',width:'80%',backgroundColor:'#3e5ed2',borderRadius:5,height:40}}>
          <Text style={{color:'white',fontSize:20}}>登录</Text>
        </TouchableOpacity>
        </View>
        )
    }
}