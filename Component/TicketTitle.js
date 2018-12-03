import React from 'react';
import {View,Text,TouchableOpacity,Image,StatusBar} from 'react-native';

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
        this.props.navigation.navigate('TicketFlew',{basicInfoId:this.props.navigation.state.params.ticketbasicinfoid,
            name:this.props.navigation.state.params.typeName,
            ishistory:this.props.navigation.state.params.ishistory})
    }
    render(){
        return(
        <React.Fragment>
        <View style={{
            width: '100%',
            paddingTop:StatusBar.currentHeight,
            height:35+StatusBar.currentHeight,
            backgroundColor: 'transparent',
            display:'flex',
            flexDirection: 'row',
            alignItems: 'center',
            elevation: 4
        }}>
            <TouchableOpacity activeOpacity={0.8} onPress={()=>this._toBack()}
                                  style={{width: 60,marginLeft:5,height:38,display:'flex',alignItems:'center',flexDirection:'row'}}>   
                    <Image source={require('../images/back.png')}
                        style={{resizeMode: Image.resizeMode.contain, height: 20, width: 20}}/>
                    <Text style={{color: 'white'}}>返回</Text>
            </TouchableOpacity>
            <View style={{flex:1,alignItems: 'center'}}>
                <Text style={{color: 'white',fontSize:18,textAlign:"center"}}>{this.props.centerText}</Text>
            </View>
            <TouchableOpacity style={{justifyContent:'center',width:60,height:43,right:5}}>
            {this.props.numns&&<Text onPress={()=>this.go()} style={{color:'#ffffff'}}>流程查看</Text>}
            </TouchableOpacity>
        </View>
        </React.Fragment>
        )
    }
}

