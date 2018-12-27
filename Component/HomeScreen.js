import React from 'react';
import {Text,View,Image,TouchableOpacity} from 'react-native';
import Topt from './TopTitle';

export default class HomeScreen extends React.Component {

  constructor(props){
    super(props)
    this.state={
      content:[
        {
          img:require('../images/go1.png'),
          wait:'待处理流程',
          about:'相关流程',
          history:'历史流程'
        }
      ],
    }
  }

  render() {
      const { navigate } = this.props.navigation;
      return (<View>
        <Topt navigation={this.props.navigation} centerText={'首页'} />
          {this.state.content.map((v,i)=><View key={i} style={{alignItems:'center'}}>
            <TouchableOpacity onPress={()=>navigate('waitPlan')} style={{borderRadius:5,elevation:3,marginTop:15,height:70,width:'93%',alignItems:'center',flexDirection:'row',backgroundColor:'#1296db',paddingLeft:8}} activeOpacity={.8}>
                  <Image source={require('../images/unhandle_ticket.png')} style={{width:45,height:45,resizeMode:Image.resizeMode.contain,marginTop:2}}/>
                  <Text style={{fontWeight:'500',left:10,color:'white',fontSize:18,flex:1}}>{v.wait}</Text>
                  <Image source={v.img} style={{width:20,resizeMode:Image.resizeMode.contain}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('correlationPlan')} style={{borderRadius:5,elevation:3,marginTop:15,height:70,width:'93%',alignItems:'center',flexDirection:'row',backgroundColor:'#1296db',paddingLeft:8}} activeOpacity={.8}>
                  <Image source={require('../images/online_ticket.png')} style={{width:45,height:45,resizeMode:Image.resizeMode.contain,marginTop:2}}/>
                  <Text style={{fontWeight:'500',left:10,color:'white',fontSize:18,flex:1}}>{v.about}</Text>
                  <Image source={v.img} style={{width:20,resizeMode:Image.resizeMode.contain}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('historyPlan')} style={{borderRadius:5,elevation:3,marginTop:15,height:70,width:'93%',alignItems:'center',flexDirection:'row',backgroundColor:'#1296db',paddingLeft:8}} activeOpacity={.8}>
                  <Image source={require('../images/search_ticket.png')} style={{width:45,height:45,resizeMode:Image.resizeMode.contain,marginTop:2}}/>
                  <Text style={{fontWeight:'500',left:10,color:'white',fontSize:18,flex:1}}>{v.history}</Text>
                  <Image source={v.img} style={{width:20,resizeMode:Image.resizeMode.contain}}/>
            </TouchableOpacity>
          </View>)}
          </View>)
    }
  }