import React from 'react';
import {ActivityIndicator, Button} from 'antd-mobile-rn';
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

    go(){
        this.props.navigation.navigate('TicketFlew',{basicInfoId:this.props.navigation.state.params.ticketbasicinfoid,name:this.props.navigation.state.params.typeName})
    }
    render(){
        return(<View style={{
            width: '100%',
            height: 43,
            backgroundColor: 'white',
            display:'flex',
            flexDirection: 'row',
            alignItems: 'center',
            elevation: 4
        }}>
            <TouchableOpacity activeOpacity={0.8} onPress={()=>this._toBack()}
                                  style={{width: 60,marginLeft:5,height:35,display:'flex',alignItems:'center',flexDirection:'row'}}>   
                    <Image source={require('../images/back.png')}
                        style={{resizeMode: Image.resizeMode.contain, height: 20, width: 20}}/>
                    <Text style={{color: '#007aff'}}>返回</Text>
            </TouchableOpacity>
            <View style={{flex:1,alignItems: 'center'}}>
                <Text style={{color: 'black',fontSize:15,textAlign:"center"}}>{this.props.centerText}</Text>
            </View>
            <View style={{width:80}}>
 
            {this.props.numns&&<Text onPress={()=>this.go()} style={{width:80,height:"100%",lineHeight:43}}>流程查看</Text>}
            </View>
        </View>)
    }
}

