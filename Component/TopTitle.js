import React from 'react';
import {ActivityIndicator} from 'antd-mobile-rn'
import {View,Text,StatusBar} from 'react-native';

export default class TopT extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
        <View style={{
            paddingTop:StatusBar.currentHeight,
            width: '100%',
            height:38+StatusBar.currentHeight,
            backgroundColor: '#0390e8',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems:'center',
            elevation:this.props.centerText=='我的'?0:3
        }}>
        {this.props.centerText=='两票管理'&&!this.props.datas&&<ActivityIndicator animating={!this.props.datas?true:false} color="white"/>}
        <Text style={{color:'white',fontSize:18,fontWeight:'500'}}>
             {!this.props.datas&&this.props.centerText=='两票管理'?'数据获取中...':this.props.centerText}
        </Text>
        </View>)
    }
}