import React from 'react';
import {ActivityIndicator} from 'antd-mobile-rn';
import {View,Text,TouchableOpacity,Image} from 'react-native';

export default class TicketTitle extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    _toBack() {
        this.props.navigation.goBack();
    }


    render(){
        return(<View style={{
            width: '100%',
            height: 43,
            backgroundColor: 'white',
            display:'flex',
            flexDirection: 'row',
            alignItems: 'center',
        }}>
            <TouchableOpacity activeOpacity={0.8} onPress={()=>this._toBack()}
                                  style={{width: 60,marginLeft:5,height:35,display:'flex',alignItems:'center',flexDirection:'row'}}>   
                    <Image source={require('../images/back.png')}
                        style={{resizeMode: Image.resizeMode.contain, height: 20, width: 20}}/>
                    <Text style={{color: '#007aff',top:1}}>返回</Text>
            </TouchableOpacity>
            <View style={{flex:1,alignItems: 'center'}}>
                <Text style={{color: 'black',fontSize:15,fontWeight:'500'}}>{this.props.centerText}</Text>
            </View>
            <View style={{width:30}}><ActivityIndicator animating={this.props.num?false:true} color="#00adb5"/></View>
        </View>)
    }
}

