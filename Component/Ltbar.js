import React from 'react';
import {View,Text,StatusBar,TouchableOpacity,Image} from 'react-native';

export default class Ltbar extends React.Component{
    constructor(props) {
        super(props);
    }

    _toBack() {
        this.props.navigation.goBack();
    }

    render(){
        return(
        <View style={{
            width: '100%',
            paddingTop:StatusBar.currentHeight,
            height:40+StatusBar.currentHeight,
            backgroundColor: '#0390e8',
            flexDirection: 'row',
            alignItems: 'center',
        }}>
           <TouchableOpacity activeOpacity={0.8} onPress={()=>this._toBack()}
                                  style={{width:60,marginLeft:5,alignItems:'center',flexDirection:'row'}}>   
                    <Image source={require('../images/back.png')}
                        style={{resizeMode:Image.resizeMode.contain,height:20,width: 20}}/>
                    <Text style={{color: 'white'}}>返回</Text>
            </TouchableOpacity>
            <View style={{flex:1,alignItems:'center'}}>
                <Text style={{color:'white',fontSize:18,fontWeight:'500'}}>{this.props.centerText}</Text>
            </View>
            <View style={{width:70,height:27}}>
            </View>
        </View>)
    }
}