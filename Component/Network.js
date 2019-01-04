import React from 'react';
import {Text,View,TouchableOpacity,TextInput} from 'react-native';
import Title from './Title';
import MySorage from '../api/storage';
import {StackActions, NavigationActions} from 'react-navigation';
const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'login' })],
});
  
export default class Network extends React.Component{
    constructor(props){
        super(props)
        this.state={
            network:''
        }
    }

    submit(){
        console.log(this.state.network)
        MySorage._sava('netWorkIp',this.state.network);
        // this.props.navigation.dispatch(resetAction);
    }

    handleInput(k, v){
        this.setState({
            [k]:v,
        });
    }

    render(){ 
    return(<View style={{alignItems:'center'}}>
    <Title navigation={this.props.navigation} centerText={'网络设置'}/>
        <View style={{marginTop:10,width:'95%',backgroundColor:'white',justifyContent:"center",alignItems:'center',borderRadius:5,elevation:3}}>
            <View style={{height:50,width:'100%',borderBottomColor:'grey',borderStyle:'solid',borderBottomWidth:1,justifyContent:'center'}}>
                    <Text style={{color:'#0390e8',marginLeft:10,fontSize:18}}>服务器地址</Text>
            </View>
            <View style={{borderWidth:1,borderStyle:'solid',borderColor:'grey',borderRadius:5,width:'96%',marginTop:10,alignItems:'center'}}>
                 <TextInput style={{width:'90%'}} onChangeText={(e)=>this.handleInput('network',e)} multiline={true} />
            </View>
            <View style={{marginTop:10,width:'100%',borderTopColor:'grey',borderStyle:'solid',borderTopWidth:1,justifyContent:'flex-end',flexDirection:'row',height:50,alignItems:'center'}}>
            <TouchableOpacity onPress={()=>this.submit()} style={{width:'20%',height:30,borderRadius:5,justifyContent:'center',alignItems:'center',backgroundColor:'#0390e8',marginRight:20}}>
            <Text style={{color:'white',fontSize:18,fontWeight:'500'}}>保存</Text>
            </TouchableOpacity>
            </View>
        </View>
    </View>)
    }

}