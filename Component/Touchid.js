import React from 'react';
import {View,Text,Alert,ToastAndroid,StatusBar,TouchableOpacity} from 'react-native';
import TouchID from 'react-native-touch-id';
import {Switch} from 'antd-mobile-rn';
import {StackActions, NavigationActions} from 'react-navigation';
import MySorage from '../api/storage';
const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Tab' })],
});

export default class Touchid extends React.Component{
    constructor(props){
        super(props)
        this.state={
            checked:false
        }
    }


    componentDidMount(){
        // MySorage._load('seting',(res)=>{
        //     this.setState({checked:res})
        // })
        this.pressHandler()
    }

    pressHandler() {
        const optionalConfigObject = {
            title: "收集指纹", // Android
            color: "#12e2a3", // Android,
            imageColor: "#12e2a3", // Android
            imageErrorColor: "#ff0000", // Android
            sensorDescription: "请放入指纹",// Android
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
        Alert.alert("指纹验证提示",'您的手机不支持指纹或未开启指纹功能',[{text:'确定'}],
            {cancelable:false}
        )
        });
        TouchID.authenticate('', optionalConfigObject).then(success => {
                ToastAndroid.show('指纹录入成功',ToastAndroid.SHORT)
                setTimeout(()=>this.props.navigation.navigate('App'),2000)
        })
    }

    onSwitchChange(e){
        this.setState({checked:e})
        MySorage._sava('setting',e)
        MySorage._sava('seting',e)
    }
    render(){
        return(<View style={{alignItems:'center',position:'relative',width:'100%',height:'100%'}}>
            <StatusBar barStyle='dark-content' />
            <Text style={{marginTop:StatusBar.currentHeight+20,fontSize:18,marginLeft:5}}>指纹收集，保护重要信息。</Text>
             <TouchableOpacity style={{padding:10,width:'100%',flexDirection:'row',justifyContent:'flex-end',height:50,alignItems:'center'}}>
                <Text style={{marginRight:10,borderColor:'grey',borderRadius:5,borderWidth:1,borderStyle:'solid',textAlign:"center"}} onPress={()=>this.props.navigation.navigate('App')}>跳过</Text>
             </TouchableOpacity>
             <View style={{position:'absolute',bottom:10,flexDirection:'row',padding:5,justifyContent:'center',alignItems:'center',height:35}}>
             <Switch checked={this.state.checked} onChange={(e)=>this.onSwitchChange(e)} />
                <Text>下次不再提示</Text>
             </View>
        </View>)
    }
}