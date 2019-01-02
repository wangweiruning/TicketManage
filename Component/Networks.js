import React from 'react';
import {Text,View,TouchableOpacity,TextInput,StatusBar} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import Ltbar from './Ltbar';
const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'login' })],
});
  
export default class Networks extends React.Component{
    constructor(props){
        super(props)
        this.state={
            
        }
    }

    submit(){
        this.props.navigation.dispatch(resetAction);
    }

    render(){ 
        return(<View style={{alignItems:'center'}}>
        <Ltbar navigation={this.props.navigation} centerText={'网络设置'}/>
            <View style={{marginTop:10,width:'95%',backgroundColor:'white',justifyContent:"center",alignItems:'center',borderRadius:5,elevation:3}}>
                <View style={{height:50,width:'100%',borderBottomColor:'grey',borderStyle:'solid',borderBottomWidth:1,justifyContent:'center'}}>
                     <Text style={{color:'#0390e8',marginLeft:10,fontSize:18}}>服务器地址</Text>
                </View>
                <View style={{borderWidth:1,borderStyle:'solid',borderColor:'grey',borderRadius:5,width:'96%',marginTop:10,alignItems:'center'}}><TextInput style={{width:'90%',}} multiline={true} /></View>
                <View style={{marginTop:10,width:'100%',borderTopColor:'grey',borderStyle:'solid',borderTopWidth:1,justifyContent:'flex-end',flexDirection:'row',height:50,alignItems:'center'}}>
                <TouchableOpacity style={{width:'20%',height:30,borderRadius:5,justifyContent:'center',alignItems:'center',backgroundColor:'#0390e8',marginRight:20}}>
                <Text style={{color:'white',fontSize:18,fontWeight:'500'}}>保存</Text>
                </TouchableOpacity>
                </View>
            </View>
        </View>)
    }

}