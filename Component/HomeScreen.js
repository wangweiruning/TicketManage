import React from 'react';
import {Text,View,Image,TouchableOpacity,ImageBackground,StatusBar} from 'react-native';


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
      ]
    }
  }

  show(){ 
    this.props.navigation.navigate('newticket')
   }
  render() {
      const { navigate } = this.props.navigation;
      return (<ImageBackground source={require('../images/gffg.jpg')} style={{alignItems:'center',width: '100%', height: '100%'}}>
          <View style={{width:'94.5%',height:'92%',marginTop:10+StatusBar.currentHeight,alignItems:'center',borderRadius:6,backgroundColor:'rgba(255,255,255,.2)'}}>
          <Text style={{fontSize:20,fontWeight:'500',color:'white',marginTop:10,marginBottom:10}}>两票管理</Text>
          {
          this.state.content.map((v,i)=><View key={i}>
          <View style={{top:10}}>
            <TouchableOpacity onPress={()=>navigate('waitPlan')} style={{height:70,minWidth:'93%',alignItems:'center',flexDirection:'row'}} activeOpacity={.8}>
                  <Image source={require('../images/unhandle_ticket.png')} style={{width:45,height:45,resizeMode:Image.resizeMode.contain,marginTop:2}}/>
                  <Text style={{fontWeight:'500',left:10,color:'white',fontSize:20,flex:1}}>{v.wait}</Text>
                  <Image source={v.img} style={{width:20,resizeMode:Image.resizeMode.contain}}/>
            </TouchableOpacity>
            <Image source={require('../images/line.png')} style={{width:'100%',height:2,resizeMode:Image.resizeMode.contain}}/>
          </View>
          <View style={{top:20}}>
          <TouchableOpacity onPress={()=>navigate('correlationPlan')} style={{height:70,minWidth:'93%',alignItems:'center',flexDirection:'row'}} activeOpacity={.8}>
                  <Image source={require('../images/online_ticket.png')} style={{width:45,height:45,resizeMode:Image.resizeMode.contain,marginTop:2}}/>
                  <Text style={{fontWeight:'500',left:10,color:'white',fontSize:20,flex:1}}>{v.about}</Text>
                  <Image source={v.img} style={{width:20,resizeMode:Image.resizeMode.contain}}/>
          </TouchableOpacity>
          <Image source={require('../images/line.png')} style={{width:'100%',height:2,resizeMode:Image.resizeMode.contain}}/>
          </View>
          <View style={{top:30}}>
              <TouchableOpacity onPress={()=>navigate('historyPlan')} style={{height:70,minWidth:'93%',alignItems:'center',flexDirection:'row'}} activeOpacity={.8}>
                  <Image source={require('../images/search_ticket.png')} style={{width:45,height:45,resizeMode:Image.resizeMode.contain,marginTop:2}}/>
                  <Text style={{fontWeight:'500',left:10,color:'white',fontSize:20,flex:1}}>{v.history}</Text>
                  <Image source={v.img} style={{width:20,resizeMode:Image.resizeMode.contain}}/>
              </TouchableOpacity>
              <Image source={require('../images/line.png')} style={{width:'100%',height:2,resizeMode:Image.resizeMode.contain}}/>
          </View>
          </View>)
          }
          </View>
          <TouchableOpacity onPress={()=>this.show()} style={{position:'absolute',bottom:35,right:35}}>
              <Image source={require('../images/addd.png')} style={{width:45,height:45}}/>
          </TouchableOpacity>          
        </ImageBackground>);
    }
  }