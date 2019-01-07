import React from 'react';
import {Text,View,Image,TouchableOpacity} from 'react-native';
import Title from './Title';

export default class Aboutme extends React.Component{
    render(){
        return(<View style={{width:'100%',height:'100%',alignItems:'center',position:'relative'}}>
            <Title navigation={this.props.navigation} centerText={'关于我们'}/>
            <Image source={require('../images/log.png')} style={{width:90,height:90,marginBottom:30,marginTop:30}}/>
            <View style={{marginTop:20,backgroundColor:'white',width:'100%',borderTopColor:"lightgrey",borderBottomColor:'lightgrey',borderTopWidth:1,borderBottomWidth:1,borderStyle:'solid'}}>
            <View style={{width:'100%',alignItems:'center',flexDirection:'row'}}>
                  <View style={{width:'8%'}}>
                    <Image source={require('../images/banben.png')} style={{marginLeft:10,width:20,height:20,resizeMode:Image.resizeMode.contain}}/>
                  </View>
                  <View style={{flexDirection:'row',width:'90%',justifyContent:'center',marginLeft:10,paddingTop:15,paddingBottom:15,borderBottomWidth:1,borderBottomColor:'lightgrey',borderStyle:'solid'}}>
                   <Text style={{color:'black',fontSize:18,flex:1}}>版本号</Text>
                   <Text style={{color:'black',fontSize:18,marginRight:13}}>v1.0.0</Text>
                  </View>
             </View>
             <TouchableOpacity onPress={()=>this.props.navigation.navigate('Nowapp')} style={{width:'100%',alignItems:'center',flexDirection:'row'}} activeOpacity={.8}>
                  <View style={{width:'8%'}}>
                    <Image source={require('../images/some.png')} style={{marginLeft:10,width:20,height:20,resizeMode:Image.resizeMode.contain}}/>
                  </View>
                  <View style={{flexDirection:'row',width:'90%',alignItems:'center',marginLeft:10,paddingTop:15,paddingBottom:15}}>
                   <Text style={{color:'black',fontSize:18,flex:1}}>关于两票一体化管理系统</Text>
                   <Image source={require('../images/go1.png')} style={{marginRight:10,width:20,height:20,resizeMode:Image.resizeMode.contain}}/>
                  </View>
             </TouchableOpacity>
             </View>
            <Text style={{color:'grey',fontSize:10,position:'absolute',bottom:10}}>Copyright © 2018-2019 武汉瑞莱保能源技术有限公司 研制.</Text>
        </View>)
    }

}