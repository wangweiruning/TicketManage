import React from 'react';
import NavigationBar from './NavigationBar';
import {Text,View,Image,TouchableOpacity} from 'react-native';


export default class HomeScreen extends React.Component {

  constructor(props){
    super(props)
    this.state={
      result:{},
      modalVisible:false,
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
      return (<View style={{alignItems:'center',position:'relative',flex:1}}>
               <View style={{position:'absolute',width:'100%',minHeight:'100%'}}>
                 <Image source={require('../images/gffg.jpg')} resizeMode="cover"/>
               </View>
               {/* <NavigationBar navigation={this.props.navigation} centertext={'两票管理'}/> */}
          <View style={{width:'96%',marginTop:38,alignItems:'center',borderRadius:6,backgroundColor:'rgba(255,255,255,.3)'}}>
          <Text style={{fontSize:20,fontWeight:'500',color:'white',marginTop:10,marginBottom:10}}>两票管理</Text>
          {
            this.state.content.map((v,i)=><View key={i}>
            <TouchableOpacity 
                  onPress={()=>navigate('waitPlan')}
                  style={{height:88,width:'85%',borderRadius:10,backgroundColor:'#5b8ce2',top:10,display:'flex',alignItems:'center',flexDirection:'row'}} 
                  activeOpacity={.8}>
            <View style={{flex:1,display:'flex',alignItems:'center',flexDirection:'row'}}>
                  <Image source={require('../images/unhandle_ticket.png')} style={{width:20,resizeMode:Image.resizeMode.contain,left:15,marginTop:2}}/>
                  <Text style={{
                    fontWeight:'500',
                    left:40,
                    color:'white',
                    fontSize:20
                    }}>{v.wait}</Text></View>
                    <Image source={v.img} style={{right:5,width:15,resizeMode:Image.resizeMode.contain}}/>
          </TouchableOpacity>
          <TouchableOpacity 
                   onPress={()=>navigate('correlationPlan')}
                   style={{height:88,width:'85%',borderRadius:10,backgroundColor:'#5b8ce2',top:20,display:'flex',alignItems:'center',flexDirection:'row'}} 
                   activeOpacity={.8}>
             <View style={{flex:1,display:'flex',alignItems:'center',flexDirection:'row'}}>
                  <Image source={require('../images/online_ticket.png')} style={{width:20,resizeMode:Image.resizeMode.contain,left:15,marginTop:2}}/>
                  <Text style={{
                    fontWeight:'500',
                    left:40,
                    color:'white',
                    fontSize:20
                    }}>{v.about}</Text></View>
                    <Image source={v.img} style={{right:5,width:15,resizeMode:Image.resizeMode.contain}}/>
          </TouchableOpacity>
          <TouchableOpacity 
                    onPress={()=>navigate('historyPlan')}
                    style={{height:88,width:'85%',borderRadius:10,backgroundColor:'#5b8ce2',top:30,display:'flex',alignItems:'center',flexDirection:'row'}} 
                    activeOpacity={.8}>
          <View style={{flex:1,display:'flex',alignItems:'center',flexDirection:'row'}}>
                  <Image source={require('../images/search_ticket.png')} style={{width:20,resizeMode:Image.resizeMode.contain,left:15,marginTop:2}}/>
                  <Text style={{
                    fontWeight:'500',
                    left:40,
                    color:'white',
                    fontSize:20
                    }}>{v.history}</Text></View>
                    <Image source={v.img} style={{right:5,width:15,resizeMode:Image.resizeMode.contain}}/>
          </TouchableOpacity>
           </View> )
          }</View>
          <TouchableOpacity onPress={()=>this.show()} style={{position:'absolute',bottom:35,right:35}}>
              <Image source={require('../images/addd.png')} style={{width:45,height:45}}/>
          </TouchableOpacity>          
        </View> );
    }
  }