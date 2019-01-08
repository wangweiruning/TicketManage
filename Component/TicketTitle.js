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
        <View style={{
            paddingTop:StatusBar.currentHeight,
            width: '100%',
            height:38+StatusBar.currentHeight,
            backgroundColor: '#0390e8',
            flexDirection: 'row',
            alignItems: 'center',
        }}>
            <TouchableOpacity activeOpacity={0.8} onPress={()=>this._toBack()}
                                  style={{width: 60,marginLeft:5,height:38,display:'flex',alignItems:'center',flexDirection:'row'}}>   
                    <Image source={require('../images/back.png')}
                        style={{resizeMode: Image.resizeMode.contain, height: 20, width: 20}}/>
                    <Text style={{color: 'white'}}>返回</Text>
            </TouchableOpacity>
            <View style={{flex:1,justifyContent:'center',flexWrap:'wrap',height:38}}>
                <Text style={{color: 'white',fontSize:16,textAlign:"center"}}>{this.props.centerText}</Text>
            </View>
            <TouchableOpacity style={{justifyContent:'center',width:60,height:38,marginRight:5}}>
            {this.props.numns&&<Text onPress={()=>this.go()} style={{color:'#ffffff'}}>流程查看</Text>}
            </TouchableOpacity>
        </View>
        )
    }
}

