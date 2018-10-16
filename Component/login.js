import React from 'react';
import {View,TouchableOpacity,Text} from 'react-native';
import {InputItem} from 'antd-mobile-rn';
import HttpUtils from '../api/Httpdata';
import MySorage from '../api/storage';
import {StackActions, NavigationActions} from 'react-navigation';

console.log("++++++++>",NavigationActions);

// const resetAction=(routeName)=>NavigationActions.reset({
//     index: 0,
//     actions: [
//       NavigationActions.navigate({ routeName})
//     ]
// });
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
     
    // componentDidMount(){
    //     MySorage.isInit()
    // }


     submitgo(url,data){
        MySorage._sava("isLogin", JSON.stringify({status: true}));
        MySorage._load("isLogin", (data) => {
            let res = JSON.parse(data);
            console.log(res)
        });
        // MySorage._sava("dicuserinfo", JSON.stringify(a.data));
        url = url +"?form.user="+data.username+"&form.pass="+data.password+"&code="+'50ACD07A6C49F3B9E082EF40461AC6D1';  
        HttpUtils.post(url,data)
        .then(result=>{
            console.log(result,'qqqqqqqqqq')
            if(data.username!=result.form.user || data.password!=result.form.pass){
                alert(result.form.targetresult)
            }
            else{
                alert(":LLLLL"+result.form.targetresult)
                this.props.navigation.dispatch(resetAction);
            }
            this.setState({
                result:JSON.stringify(result),//序列化：转换为一个 (字符串)JSON字符串
            });
        })
        .catch(error=> {
            console.log(error,'aaaaaaaaaa')
            this.setState({
                result: JSON.stringify(error),
            //把错误信息格式化为字符串
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