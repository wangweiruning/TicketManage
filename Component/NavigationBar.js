import React from 'react';
import {Text,View,Button} from 'react-native';

export default class NavigationBar extends React.Component{
    constructor(props){
        super(props)
        this.state={
        }
    }

    

    render(){

        return(<View style={{
            width: '100%',
            height: 43,
            backgroundColor: '#4c70b9',
            display:'flex',
            elevation:4,
            flexDirection: 'row',
            justifyContent:'center',
            alignItems: 'center',
        }}>
            {/* <View style={{width:80,height:43}}></View> */}
            <Text style={{fontSize:20,fontWeight:'500',color:'white'}}>{this.props.centertext}</Text>
            {/* <View style={{width:80,justifyContent:'center',alignItems:'center'}}>
                {
                    this.props.centertext==='两票管理'?
                    <Button color='#2185d5' title="新建两票" onPress={()=>this.show()}/>:null
                }
            </View>     */}
        </View>)
    }
}