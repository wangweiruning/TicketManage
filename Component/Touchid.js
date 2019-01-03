import React from 'react';
import {View,TouchableOpacity,Text,Alert,ToastAndroid,Platform,BackHandler,DeviceEventEmitter,Image,TextInput,StatusBar} from 'react-native';
import TouchID from 'react-native-touch-id';
import {ActivityIndicator,Toast,Switch} from 'antd-mobile-rn';
import {StackActions, NavigationActions} from 'react-navigation';
import MySorage from '../api/storage';
const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Tab' })],
});

export default class Touch extends React.Component{
    constructor(props){
        super(props)
        this.state={
            checked:false
        }
    }


    componentDidMount(){
        MySorage._sava('seting',this.state.checked)
        this.pressHandler()
    }

    pressHandler() {
        const optionalConfigObject = {
            title: "录入指纹", // Android
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
        TouchID.authenticate('', optionalConfigObject)
            .then(success => {
                ToastAndroid.show('指纹录入成功',ToastAndroid.SHORT)
                setTimeout(()=>this.props.navigation.dispatch(resetAction),1500)
        })
    }

    onSwitchChange(e){
        this.setState({checked:e})
        console.log(e)
        MySorage._sava('seting',e)
    }
    render(){
        return(<View>
            <StatusBar barStyle='dark-content' />
            <Text style={{marginTop:StatusBar.currentHeight+10,fontSize:18,marginLeft:5}}>指纹录入，保护重要信息</Text>
             <View style={{width:'100%',flexDirection:'row',justifyContent:'flex-end',height:50,alignItems:'center'}}>
                <Text style={{marginRight:10}} onPress={()=>this.props.navigation.dispatch(resetAction)}>跳过</Text>
             </View>
             <View style={{width:'100%',alignItems:'center',height:35}}>
             <Text>下次不再提示</Text>
             <Switch checked={this.state.checked} onChange={(e)=>this.onSwitchChange(e)} />
             </View>
        </View>)
    }
}