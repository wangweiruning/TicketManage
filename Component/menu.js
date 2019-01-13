import React from 'react';
import {View,Text,TouchableOpacity,Alert,Image,StatusBar,ToastAndroid} from 'react-native';
import MySorage from '../api/storage';
import TouchID from 'react-native-touch-id';
import {userlist,historys} from '../api/api';
import {Switch} from 'antd-mobile-rn';
import Topt from './TopTitle';


export default class Me extends React.Component {
  constructor(props){
    super(props)
    this.state={
      bools:false,
      user:'',
      tou:false,
      list:[],
      realname:'',
    }
  }
 
  componentWillMount(){
    TouchID.isSupported().then(biometryType => {
    // Success code
    }).catch(error => {
    // Failure code
    this.setState({
      tou:true
    })
   })
  }

  async componentDidMount(){
    let x = await userlist();
    let d = `?form.tree_node_operation=0`;
    let g = await historys(d);
    this.setState({
      list:x.form.paramAllList,
      user:g.form.userId
    })
    this.real();
    MySorage._load("seting",(ress) => {
      this.setState({
        bools:ress
      })
    })
  //   this.viewDidAppear = this.props.navigation.addListener(
  //     'willFocus', async(obj)=>{
  //         MySorage._load("seting",(ress) => {
  //                 this.setState({
  //                   bools:ress
  //                 })
  //         })
  //     }
  // );
  }
 
  real(){
      let r = this.state.list;
      let y = this.state.user;
      let e = r.findIndex((v)=>{
        if(y==v.userid){
           this.setState({
            realname:v.realname
           })
        }
      })
  }
  
  out(){
    let boll = this.state.bools;
    let ttt = this.state.tou
    Alert.alert(
      '','确认退出吗？',
      [
       {text:'是',onPress:()=>ttt?this.resets('Auth'):this.reset(boll?'Auth':'Touch')},
       {text:'否',onPress:this.opntion2Selected}
      ],
      {cancelable:false}
  )
  }

  resets(s){
    MySorage._remove('userinfo')
    this.props.navigation.navigate(s)
  }

  change(e){
      this.setState({bools:e})
      MySorage._sava('seting',e)
      ToastAndroid.show('设置成功',ToastAndroid.SHORT)
  }


  reset(s){
    MySorage._remove('userinfo')
    this.props.navigation.navigate(s)
  }

  render() {
    return (<View style={{alignItems:'center'}}>
              <Topt navigation={this.props.navigation} centerText={'我的'} />
                <View style={{width:'100%',height:120,backgroundColor:'#0390e8',alignItems:'center',flexDirection:'row',paddingLeft:10}}>
                     <View style={{width:70,height:70,borderRadius:5,overflow:'hidden',justifyContent:'center',alignItems:'center'}}>
                       <Image source={require('../images/avo.png')} style={{width:70,height:70}} />
                     </View>
                     <Text style={{fontSize:18,color:'white',fontWeight:'300',marginLeft:10}}>{jconfig.userinfo.user?this.state.realname:'暂无'}</Text>
                </View>
            {this.state.tou?<Text style={{marginLeft:10,marginTop:10,color:'grey',fontSize:10}}>本机不支持指纹功能或未开启指纹功能，指纹登录将无法使用</Text>:<Text style={{marginLeft:10,marginTop:10,color:'grey',fontSize:10}}>开启后可以使用指纹进行快捷登录，设置仅对本机生效，如需修改指纹，请在手机系统设置里面操作。</Text>}
            <View style={{paddingBottom:15,paddingTop:15,marginTop:10,alignItems:'center',flexDirection:'row',width:'100%',backgroundColor:'white',borderTopColor:"lightgrey",borderBottomColor:'lightgrey',borderTopWidth:1,borderBottomWidth:1,borderStyle:'solid'}}>
                   <Image source={this.state.tou?require('../images/touch1.png'):require('../images/touch.png')} style={{width:20,height:20,resizeMode:Image.resizeMode.contain,marginLeft:10}}/>
                   <Text style={{color:this.state.tou?'lightgrey':'black',fontSize:18,flex:1,marginLeft:10}}>{this.state.bools?'关闭指纹验证':'打开指纹验证'}</Text>
                   <Switch disabled={this.state.tou} style={{marginRight:10}} checked={this.state.bools} onChange={(e)=>this.change(e)}/>
            </View>
             <View style={{marginTop:20,backgroundColor:'white',width:'100%',borderTopColor:"lightgrey",borderBottomColor:'lightgrey',borderTopWidth:1,borderBottomWidth:1,borderStyle:'solid'}}>
             <TouchableOpacity onPress={()=>this.props.navigation.navigate('Network')} style={{width:'100%',alignItems:'center',flexDirection:'row'}} activeOpacity={.8}>
                  <View style={{marginLeft:10}}>
                    <Image source={require('../images/shezhi.png')} style={{width:20,height:20,resizeMode:Image.resizeMode.contain}}/>
                  </View>
                  <View style={{flexDirection:'row',width:'90%',alignItems:'center',marginLeft:10,paddingTop:15,paddingBottom:15,borderBottomWidth:1,borderBottomColor:'lightgrey',borderStyle:'solid'}}>
                   <Text style={{color:'black',fontSize:18,flex:1}}>网络配置</Text>
                   <Image source={require('../images/go1.png')} style={{marginRight:10,width:15,height:15,resizeMode:Image.resizeMode.contain}}/>
                  </View>
             </TouchableOpacity>
             <TouchableOpacity onPress={()=>this.props.navigation.navigate('Aboutme')} style={{width:'100%',alignItems:'center',flexDirection:'row'}} activeOpacity={.8}>
                 <View style={{marginLeft:10}}>
                   <Image source={require('../images/ours.png')} style={{width:20,height:20,resizeMode:Image.resizeMode.contain}}/>
                 </View>
                  <View style={{flexDirection:'row',width:'90%',alignItems:'center',marginLeft:10,paddingTop:15,paddingBottom:15,borderBottomWidth:1,borderBottomColor:'lightgrey',borderStyle:'solid'}}>
                   <Text style={{color:'black',fontSize:18,flex:1}}>关于</Text>
                   <Image source={require('../images/go1.png')} style={{marginRight:10,width:15,height:15,resizeMode:Image.resizeMode.contain}}/>
                  </View>
             </TouchableOpacity>
             <TouchableOpacity onPress={()=> this.out()} style={{width:'100%',alignItems:'center',flexDirection:'row'}} activeOpacity={.5}>
                  <View style={{marginLeft:10}}>
                   <Image source={require('../images/out.png')} style={{width:20,height:20,resizeMode:Image.resizeMode.contain}}/>
                 </View>
                 <View style={{flexDirection:'row',width:'90%',alignItems:'center',paddingTop:15,paddingBottom:15,marginLeft:10}}>
                   <Text style={{color:'black',fontSize:18,flex:1}}>退出系统</Text>
                   <Image source={require('../images/go1.png')} style={{marginRight:10,width:15,height:15,resizeMode:Image.resizeMode.contain}}/>
                 </View>
             </TouchableOpacity>
             </View>
             </View>)
      }
}