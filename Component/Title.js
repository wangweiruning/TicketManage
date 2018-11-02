import React from 'react';
import {View,Text,TouchableOpacity,Image} from 'react-native';

export default class Title extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    _toBack() {
        this.props.navigation.goBack();
    }
    HaveSee(){
        const {navigate} = this.props.navigation
        // alert("11")
        console.log(this.props.navigation)
        navigate('TicketFlew',{centerText:this.props.navigation.state.params.v})
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
                <Text style={{color: 'black',fontSize:15,fontWeight:'500'}}>{this.props.centerText}</Text>
            </View>
            <View style={{right:7,alignItems:"center",justifyContent:'center',width:75,height:27}}><Text 
                       onPress={()=>this.HaveSee()}
                       style={{color: '#007aff',fontWeight:'500'}}>{this.props.rightText}
                  </Text> 
            </View>
        </View>)
    }
}

