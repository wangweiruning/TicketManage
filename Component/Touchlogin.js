import React from 'react';
import {View,TouchableOpacity,Text,Alert,ToastAndroid,Platform,BackHandler,DeviceEventEmitter,Image,TextInput,StatusBar} from 'react-native';
import TouchID from 'react-native-touch-id';
import {ActivityIndicator,Toast} from 'antd-mobile-rn';
import TopT from './TopTitle';
import {login} from '../api/api';
import MySorage from '../api/storage';
import {StackActions, NavigationActions} from 'react-navigation';
const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Tab' })],
  });
  MySorage._getStorage(); 
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
        this.pressHandler()
        await new Promise((s1, s2) => {
            MySorage._load("history",(ress) => {
                let infos = ress;
                if(!infos) s1(); 
                this.state.user=infos.data;
                this.state.pass=infos.datag;
                this.forceUpdate();  
                s1();
            })
      })
    }

   async submitgo(){
    this.setState({
        loading:true
    })
        if(window.config.data){
         let datas =`?form.user=${this.state.user}&form.pass=${this.state.pass}&code=50ACD07A6C49F3B9E082EF40461AC6D1`;
         let result = await login(datas)
         if(result.form.status == 1){
            window.jconfig.userinfo=result.form;
            MySorage._sava("userinfo",JSON.stringify(result.form));            
            this.props.navigation.dispatch(resetAction);
          }
          else{
            Alert.alert('',result.form.targetresult,[{text:'是',onPress:this.opntion2Selected}])
            this.setState({
               loading:false
           })
          }
        }
        else{
            ToastAndroid.show('登录信息过期',ToastAndroid.SHORT)
            return this.props.navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({routeName:'login'})
                ]
            }))
        }
        
    }
    

    pressHandler() {
        const optionalConfigObject = {
            title: "指纹验证登录", // Android
            color: "#12e2a3", // Android,
            imageColor: "#12e2a3", // Android
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
            Alert.alert("指纹验证提示",'您的手机不支持指纹登录或未开启指纹功能，请选择手动登录',[{text:'确定'}],
                {cancelable:false}
            )
        });
        TouchID.authenticate('', optionalConfigObject)
            .then(success => {
                this.submitgo()
            })
    }
    render(){
        return(<View style={{position:'relative',flex:1}}>
          <TopT navigation={this.props.navigation} centerText={'指纹验证登录'}/>
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
        <View style={{width:'100%',height:30,alignItems:'center'}}>
          <Text onPress={()=>this.pressHandler()}>再试一次</Text>
          </View>
          <View style={{width:'100%',height:30,bottom:10,alignItems:'center',position:'absolute'}}>
          <Text onPress={()=>this.props.navigation.navigate('login')}>更多</Text>
          </View>
        </View>)
    }
}