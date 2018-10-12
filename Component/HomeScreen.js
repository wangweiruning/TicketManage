import React from 'react';
import NavigationBar from './NavigationBar';
import {Text,View,ScrollView,Image,TouchableOpacity,Alert,Modal} from 'react-native';

export default class HomeScreen extends React.Component {

  constructor(props){
    super(props)
    this.state={
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
     
  }

  

  render() {
      const { navigate } = this.props.navigation;
      return (<View>
               <NavigationBar navigation={this.props.navigation} centertext={'管理'}/>
          {
            this.state.content.map((v)=><View>
            <TouchableOpacity style={{height:50,backgroundColor:'#3e5ed2',top:10,display:'flex',alignItems:'center',flexDirection:'row'}} activeOpacity={.8}>
            <View style={{flex:1,display:'flex',alignItems:'center',flexDirection:'row'}}><Image source={require('../images/unhandle_ticket.png')} style={{width:15,resizeMode:Image.resizeMode.contain,left:15,marginTop:2}}/>
                  <Text style={{
                    left:40,
                    color:'white',
                    fontSize:20
                    }}>{v.wait}</Text></View>
                    <Image source={v.img} style={{right:5,width:15,resizeMode:Image.resizeMode.contain}}/>
          </TouchableOpacity>
          <TouchableOpacity style={{height:50,backgroundColor:'#3e5ed2',top:20,display:'flex',alignItems:'center',flexDirection:'row'}} activeOpacity={.8}>
             <View style={{flex:1,display:'flex',alignItems:'center',flexDirection:'row'}}><Image source={require('../images/online_ticket.png')} style={{width:15,resizeMode:Image.resizeMode.contain,left:15,marginTop:2}}/>
                  <Text style={{
                    left:40,
                    color:'white',
                    fontSize:20
                    }}>{v.about}</Text></View>
                    <Image source={v.img} style={{right:5,width:15,resizeMode:Image.resizeMode.contain}}/>
          </TouchableOpacity>
          <TouchableOpacity style={{height:50,backgroundColor:'#3e5ed2',top:30,display:'flex',alignItems:'center',flexDirection:'row'}} activeOpacity={.8}>
          <View style={{flex:1,display:'flex',alignItems:'center',flexDirection:'row'}}><Image source={require('../images/search_ticket.png')} style={{width:15,resizeMode:Image.resizeMode.contain,left:15,marginTop:2}}/>
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