import React from 'react';
import {View,Image,ToastAndroid,TouchableOpacity} from 'react-native';
import TouchID from 'react-native-touch-id';
import Title from './Title';
import MySorage from '../api/storage';

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
        // this.pressHandler()
    }

    pressHandler() {
        const optionalConfigObject = {
            title: "绑定指纹", // Android
            color: "#0390e8", // Android,
            imageColor: "#0390e8", // Android
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
        });
        TouchID.authenticate('', optionalConfigObject).then(success => {
                ToastAndroid.show('指纹绑定成功',ToastAndroid.SHORT)
                setTimeout(()=>this.props.navigation.navigate('Me'),2000)
        })
    }

    render(){
        return(<View style={{alignItems:'center',width:'100%',height:'100%'}}>
              <Title navigation={this.props.navigation} centerText={'绑定指纹'}/>
              <TouchableOpacity onPress={()=>this.pressHandler()} style={{top:'37%'}}>
                 <Image source={require('../images/big.png')} style={{width:60,height:60}}/>
              </TouchableOpacity>
        </View>)
    }
}