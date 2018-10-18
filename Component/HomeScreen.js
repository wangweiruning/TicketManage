import React from 'react';
import NavigationBar from './NavigationBar';
import MySorage from '../api/storage';
import {editquanxian} from './../api/api'
import {Text,View,ScrollView,Image,TouchableOpacity,Alert,Modal} from 'react-native';


export default class HomeScreen extends React.Component {

  constructor(props){
    super(props)
    this.state={
      result:{},
      modalVisible:false,
      content:[
        {
          img:require('../images/go.png'),
          wait:'待处理流程',
          about:'相关流程',
          history:'历史流程'
        }
      ]
    }
  }

  async componentDidMount(){
 let liu = '22f83ccc70f746b3b1b49ce63987f618';
   let quan = '?form.flowroleid='+liu;
   let qwer = await editquanxian(quan)
      this.setState({
        result:qwer.from  
      })
    }
  

  render() {
    console.log(jconfig.userinfo,'qtrqt')
      const { navigate } = this.props.navigation;
      return (<View>
               <NavigationBar navigation={this.props.navigation} centertext={'管理'}/>
          {
            this.state.content.map((v,i)=><View key={i}>
            <TouchableOpacity 
                  onPress={()=>navigate('waitPlan')}
                  style={{height:50,backgroundColor:'#3e5ed2',top:10,display:'flex',alignItems:'center',flexDirection:'row'}} 
                  activeOpacity={.8}>
            <View style={{flex:1,display:'flex',alignItems:'center',flexDirection:'row'}}>
                  <Image source={require('../images/unhandle_ticket.png')} style={{width:15,resizeMode:Image.resizeMode.contain,left:15,marginTop:2}}/>
                  <Text style={{
                    left:40,
                    color:'white',
                    fontSize:20
                    }}>{v.wait}</Text></View>
                    <Image source={v.img} style={{right:5,width:15,resizeMode:Image.resizeMode.contain}}/>
          </TouchableOpacity>
          <TouchableOpacity 
                   onPress={()=>navigate('correlationPlan')}
                   style={{height:50,backgroundColor:'#3e5ed2',top:20,display:'flex',alignItems:'center',flexDirection:'row'}} 
                   activeOpacity={.8}>
             <View style={{flex:1,display:'flex',alignItems:'center',flexDirection:'row'}}>
                  <Image source={require('../images/online_ticket.png')} style={{width:15,resizeMode:Image.resizeMode.contain,left:15,marginTop:2}}/>
                  <Text style={{
                    left:40,
                    color:'white',
                    fontSize:20
                    }}>{v.about}</Text></View>
                    <Image source={v.img} style={{right:5,width:15,resizeMode:Image.resizeMode.contain}}/>
          </TouchableOpacity>
          <TouchableOpacity 
                    onPress={()=>navigate('historyPlan')}
                    style={{height:50,backgroundColor:'#3e5ed2',top:30,display:'flex',alignItems:'center',flexDirection:'row'}} 
                    activeOpacity={.8}>
          <View style={{flex:1,display:'flex',alignItems:'center',flexDirection:'row'}}>
                  <Image source={require('../images/search_ticket.png')} style={{width:15,resizeMode:Image.resizeMode.contain,left:15,marginTop:2}}/>
                  <Text style={{
                    left:40,
                    color:'white',
                    fontSize:20
                    }}>{v.history}</Text></View>
                    <Image source={v.img} style={{right:5,width:15,resizeMode:Image.resizeMode.contain}}/>
          </TouchableOpacity>
           </View> )
          }          
        </View> );
    }
  }