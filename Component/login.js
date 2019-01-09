import React from 'react';
import {View,TouchableOpacity,Text,Alert,ToastAndroid,Platform,BackHandler,DeviceEventEmitter,Image,TextInput,StatusBar} from 'react-native';
import {ActivityIndicator,Toast} from 'antd-mobile-rn';

import {login} from '../api/api';
import MySorage from '../api/storage';
import TouchID from 'react-native-touch-id';
import {TextInputLayout} from 'rn-textinputlayout';
import {StackActions, NavigationActions} from 'react-navigation';
const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Tab' })],
});
MySorage._getStorage()
export default class Login extends React.Component{
     constructor(props){
         super(props);
         this.state={
            bool:null,
            user:'',
            tou:false,
            pass:'',
            result:{},
            userpass:{},
            loading:false
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

    async componentDidMount () {
        
        await new Promise((s1, s2) => {
            MySorage._load("history",(ress) => {
                let infos = ress;
                if(!infos)return s1(); 
                this.setState({
                    user:infos.data
                })
                this.forceUpdate();
                s1();
            })
        })
        await new Promise((s1, s2) => {
            MySorage._load("seting",(ress) => {
                if(!ress) return s1();
                this.setState({
                    bool:ress
                })
                this.forceUpdate();
                s1();
            })
        })

            // 添加监听进入登陆页然后禁止用户点击返回键返回主页面
            this.viewDidAppear = this.props.navigation.addListener(
                'willFocus',(obj)=>{
                    if (Platform.OS === 'android') {
                        BackHandler.addEventListener("hardwareBackPress", this.onBackClicked);
                    }
                }
             );
    
             // 添加监听登陆页界面被销毁之后恢复返回键的效果
             this.viewDidAppear1 = this.props.navigation.addListener(
                'willBlur',(obj)=>{
                    if (Platform.OS === 'android') {
                        BackHandler.removeEventListener("hardwareBackPress", this.onBackClicked)
                    }
                }
             );
     } 

     onBackClicked = () => {
        return true;
    }

    componentWillUnmount(){
        this.setState = (state,callback)=>{
        return;
      };
    }
     
    async submitgo(){
        let boll = this.state.bool;
        let ttt = this.state.tou
        this.setState({
            loading:true
        })
        if(this.state.user==""){
            ToastAndroid.show('请输入账号',ToastAndroid.SHORT);
            this.setState({loading:false})
            return 
        }
        if(this.state.pass==""){
            ToastAndroid.show('请输入密码',ToastAndroid.SHORT);
            this.setState({loading:false})
            return 
        }
        try{
         let datas =`?form.user=${this.state.user}&form.pass=${this.state.pass}&code=50ACD07A6C49F3B9E082EF40461AC6D1`;
         let result = await login(datas)
         if(result.form.status == 1){
            window.jconfig.userinfo=result.form;
            MySorage._sava("userinfo",JSON.stringify(result.form));  
            this.setState({
                userpass:{data:this.state.user,datag:this.state.pass},
            })  
            MySorage._sava("history",this.state.userpass);        
            !boll&&!ttt?this.props.navigation.navigate('Touchid'):this.props.navigation.dispatch(resetAction)
          }
         else{
            Alert.alert('',result.form.targetresult,[{text:'是',onPress:this.opntion2Selected}])
            this.setState({
               loading:false
           })
        }
         this.setState({
              result:result,  //序列化：转换为一个 (字符串)JSON字符串
        });

        }catch(e){
            Toast.fail("服务器出现问题或网络连接异常",3,null,true)
            this.setState({
                loading:false
            })
        }
     }

     handleInput(k, v){
        this.setState({
            [k]:v,
        });
    }
   


    render(){
        return(<View style={{position:'relative',flex:1}}>
        {/* <StatusBar backgroundColor={'transparent'} translucent={true} /> */}
        {this.state.loading?<View style={{alignItems:'center',top:'75%'}}>
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
        <View style={{position:'absolute',width:'100%',height:'100%'}}>
        <Image source={require('../images/cc.jpg')} style={{width:'100%',height:'100%'}}/>
        </View>
          <View style={{marginTop:"10%",alignItems:'center'}}>
          <Image source={require('../images/log.png')} style={{width:70,height:70,marginBottom:10}} resizeMode = 'contain'/>
          <Text style={{fontWeight:'500',color:'white',fontSize:18}}>瑞智一体化两票管理系统</Text>
           <View style={{flexDirection:'row',alignItems:'flex-end',marginTop:15,height:60}}>
               <Image source={require('../images/login-username.png')} style={{width:25,top:10,marginRight:5}} resizeMode = 'contain'/>
            <TextInputLayout focusColor='white' style={{width:'82%'}}> 
                    <TextInput style={{fontSize:16,height:40,color:'white',fontSize:18}} value={this.state.user}
                        placeholder={'账号'} onChangeText={(e)=>this.handleInput('user',e)}
                    />
            </TextInputLayout>
           </View>
           <View style={{flexDirection:'row',alignItems:'flex-end',marginTop:15,height:60}}>
               <Image source={require('../images/login-password.png')} style={{width:25,top:10,marginRight:5}} resizeMode = 'contain'/>
            <TextInputLayout focusColor='white' style={{width:'82%'}}> 
                    <TextInput style={{fontSize:16,height:40,color:'white',fontSize:18}}
                        placeholder={'密码'} secureTextEntry={true} onChangeText={(e)=>this.handleInput('pass',e)}
                    />
            </TextInputLayout>
           </View>
           <TouchableOpacity disabled={this.state.loading?true:false} onPress={()=>this.submitgo()} 
               style={{elevation:3,marginTop:15,justifyContent:'center',alignItems:'center',width:'80%',backgroundColor:this.state.loading?'rgba(54,87,147,.3)':'#1296db',borderRadius:5,height:40}}>
          <Text style={{color:'white',fontSize:18}}>登录</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Networks')} style={{backgroundColor:'rgba(255,255,255,.4)',width:38,height:38,borderRadius:19,marginTop:40,justifyContent:'center',alignItems:'center'}}>
         <Image source={require('../images/net.png')} style={{width:30,height:30}}/>
        </TouchableOpacity>
        </View>
        </View>)
    }
}