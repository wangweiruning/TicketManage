import React from 'react';
import {View,Text,Alert,StatusBar,TouchableOpacity} from 'react-native';
import TouchID from 'react-native-touch-id';
import {ActivityIndicator,Toast} from 'antd-mobile-rn';
import {login} from '../api/api';
import MySorage from '../api/storage';

 
export default class Touchlogin extends React.Component{
    constructor(props){
        super(props)
        this.state={
            user:'',
            pass:'',
            loading:false
        }
    }

    async componentDidMount(){
        // this.pressHandler()
        await new Promise((s1, s2) => {
            MySorage._load("history",(ress) => {
                let infos = ress;
                if(!infos) return s1(); 
                this.state.user=infos.data;
                this.state.pass=infos.datag;
                this.forceUpdate();  
                s1();
            })
      })
      MySorage._getStorage();
    }

   async submitgo(){
        try{
            this.setState({
                loading:true
            })
             let datas =`?form.user=${this.state.user}&form.pass=${this.state.pass}&code=50ACD07A6C49F3B9E082EF40461AC6D1`;
             let result = await login(datas)
             if(result.form.status == 1){
                window.jconfig.userinfo=result.form;
                MySorage._sava("userinfo",JSON.stringify(result.form));            
                this.props.navigation.navigate('App')
              }
              else{
                this.setState({
                    loading:false
                })
               return Alert.alert('',result.form.targetresult,[{text:'是',onPress:this.opntion2Selected}])
              }
        }catch(e){
            Toast.fail("服务器出现问题或网络连接异常",2,null,true)
            this.setState({
                loading:false
            })
        }
    }
    

    pressHandler() {
        const optionalConfigObject = {
            title: "指纹验证登录", // Android
            color: "#0390e8", // Android,
            imageColor: "#0390e8", // Android
            imageErrorColor: "#ff0000", // Android
            sensorDescription: "请放入指纹", // Android
            sensorErrorDescription: "验证失败，请重试", // Android
            cancelText: "取消", // Android
           // use unified error messages (default false)
        }
        const optionalConfig = {
            unifiedErrors: true // use unified error messages (default false)
          }
        TouchID.isSupported(optionalConfig)
        .then(biometryType => {
            // Success code
        })
        .catch(error => {
           // Failure code
            this.setState({
                loading:false
            })
        });
        TouchID.authenticate('', optionalConfigObject)
            .then(success => {
                this.submitgo()
            })
    }
    render(){
        return(<View style={{position:'relative',flex:1,alignItems:'center'}}>
          <StatusBar barStyle='dark-content' />
          <Text style={{marginTop:StatusBar.currentHeight+20,fontSize:18,marginLeft:5}}>指纹验证登录，更便捷的登录方式。</Text>
          {this.state.loading?<View style={{alignItems:'center',top:'65%'}}>
           <View style={{borderRadius:4,
                      borderColor:'rgba(255,255,255,.5)',
                      borderWidth:1,
                      borderStyle:'solid',
                      position:'absolute',
                      width:80,
                      height:80,
                      alignItems:'center',
                      backgroundColor:'rgba(0,0,0,.6)',
                      paddingTop:10,
                      zIndex:10000000000}}>
              <ActivityIndicator color="white"/>
              <Text style={{color:'white',fontSize:15,marginTop:20}}>登录中...</Text>
        </View>
        </View>:null}
           <TouchableOpacity style={{padding:10,justifyContent:'center',height:30,alignItems:'center',top:100,borderColor:'grey',borderRadius:10,borderWidth:1,borderStyle:'solid',backgroundColor:'#0390e8'}}>
             <Text onPress={()=>this.pressHandler()}>指纹登录</Text>
           </TouchableOpacity>
           <TouchableOpacity style={{padding:10,justifyContent:'center',height:30,bottom:10,alignItems:'center',position:'absolute',borderColor:'grey',borderRadius:10,borderWidth:1,borderStyle:'solid'}}>
             <Text onPress={()=>this.props.navigation.navigate('login')}>更多</Text>
           </TouchableOpacity>
        </View>)
    }
}