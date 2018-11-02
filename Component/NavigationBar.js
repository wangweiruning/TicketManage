import React from 'react';
import {Text,View,TouchableOpacity} from 'react-native';

export default class NavigationBar extends React.Component{
    constructor(props){
        super(props)
        this.state={
        }
    }

    show(){ 
        this.props.navigation.navigate('newticket')
    }

    render(){

        return(<View style={{
            width: '100%',
            height: 43,
            backgroundColor: 'white',
            display:'flex',
            flexDirection: 'row',
            justifyContent:'center',
            alignItems: 'center',
            elevation: 4
        }}>
            <View style={{width:80,height:43}}></View>
            <Text style={{fontSize:20,fontWeight:'500',color:'black',textAlign:'center',flex:1}}>{this.props.centertext}</Text>
            <View style={{width:80,justifyContent:'center',alignItems:'center'}}>
                {
                    this.props.centertext==='管理'?
                    <TouchableOpacity style={{width:75,height:27,backgroundColor:'rgba(158,158,158,.2)',alignItems:'center',justifyContent:'center',right:7}} onPress={()=>this.show()}>
                      <Text style={{color:'#26baee',fontWeight:'500'}}>新建两票</Text></TouchableOpacity>:null
                }
            </View>    
        </View>)
    }
}