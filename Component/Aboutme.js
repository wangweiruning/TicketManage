import React from 'react';
import {Text,View,Image,TouchableOpacity} from 'react-native';
import Title from './Title';

export default class Aboutme extends React.Component{
    render(){
        return(<View style={{width:'100%',height:'100%',alignItems:'center',position:'relative'}}>
            <Title navigation={this.props.navigation} centerText={'关于我们'}/>
            <Image source={require('../images/log.png')} style={{width:90,height:90,marginBottom:10,marginTop:40}}/>
            <View style={{width:'100%',backgroundColor:'white'}}>
               <View style={{width:'100%',height:40,alignItems:"center",flexDirection:'row'}}>
                 <Image source={require('../images/banben.png')} style={{width:25,height:25,marginLeft:10}}/>
                  <Text style={{color:'black',fontSize:15,marginLeft:10}}>版本号：v1.0.0</Text>
               </View>
            </View>
            <Text style={{color:'grey',fontSize:10,position:'absolute',bottom:10}}>Copyright © 2018-2019 武汉瑞莱保能源技术有限公司 研制.</Text>
        </View>)
    }

}