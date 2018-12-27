import React from 'react';
import {Text,View,Image,TouchableOpacity,ImageBackground,StatusBar,Alert} from 'react-native';
import {awaitdeteal,historys,correation} from '../api/api';
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
      aiaitList:"",
      corrlateList:'',
      history:'',
    }
  }
  async componentDidMount(){
        const histo = await historys("?form.tree_node_operation="+0);
        const datas = "?form.userId="+histo.form.userId;
        const result = await awaitdeteal(datas);//待处理数据

        const datas2 = "?form.tree_node_operation="+0;
        const result2 = await historys(datas2);//历史数据
        const datas3 = "?form.userId="+result2.form.userId;
        const result3 = await correation(datas3);//相关流程数据

        console.log(result,result2,result3)
        this.setState({
          aiaitList:result.form.dataList.length,
          history:result2.form.page.totalRecords,
          corrlateList:result3.form.dataList.length
        })
  }
  show(){
    const {navigate} = this.props.navigation
    if(jconfig.userinfo.user==null){
      return Alert.alert(
        "登录超时",
        "登录状态已过期，请重新登录",
        [
          {text: '去登陆', onPress: () => navigate('login')},
        ],
        {cancelable:false}
      );
    }
    if(jconfig.userinfo.status==0) {
       Alert.alert(
        "登录验证",
        "你还没有登录哦，请先登录再来吧",
        [
          {text: '去登陆', onPress: () => navigate('login')},
        ],
        {cancelable:false}
      );
      return 
    } 
    this.props.navigation.navigate('newticket')
   }
  render() {
    
      const { navigate } = this.props.navigation;
      return (<View>
        <Topt navigation={this.props.navigation} centerText={'两票管理'} />
         <View style={{width:'94.5%',height:'92%',alignItems:'center'}}>
          <View style={{flexDirection:'row',width:'100%',justifyContent:'space-evenly'}}>
              <View style={{padding:5,alignItems:'center',borderColor:'#f5f5f5',borderWidth:1,borderStyle:'solid',width:'31%'}}>
                  <Image source={require('../images/await.png')} style={{width:30,resizeMode:Image.resizeMode.contain}}/>
                  <Text style={{color:"#fff"}}>待处理流程</Text>
                  <Text style={{color:"#fff"}}>共{this.state.aiaitList}条</Text>
              </View>
              <View style={{padding:5,alignItems:'center',borderColor:'#f5f5f5',borderWidth:1,borderStyle:'solid',width:'31%'}}>
                  <Image source={require('../images/colle.png')} style={{width:30,resizeMode:Image.resizeMode.contain}}/>
                  <Text style={{color:"#fff"}}>相关流程</Text>
                  <Text style={{color:"#fff"}}>共{this.state.corrlateList}条</Text>
              </View>
              <View style={{padding:5,alignItems:'center',borderColor:'#f5f5f5',borderWidth:1,borderStyle:'solid',width:'31%'}}>
                  <Image source={require('../images/history.png')} style={{width:30,resizeMode:Image.resizeMode.contain}}/>
                  <Text style={{color:"#fff"}}>历史流程</Text>
                  <Text style={{color:"#fff"}}>共{this.state.history}条</Text>
              </View>
          </View>
          {
          this.state.content.map((v,i)=><View key={i}>
          <View style={{marginTop:10}}>
            <TouchableOpacity onPress={()=>navigate('waitPlan')} style={{height:70,minWidth:'93%',alignItems:'center',flexDirection:'row'}} activeOpacity={.8}>
                  <Image source={require('../images/unhandle_ticket.png')} style={{width:45,height:45,resizeMode:Image.resizeMode.contain,marginTop:2}}/>
                  <Text style={{fontWeight:'500',left:10,color:'white',fontSize:20,flex:1}}>{v.wait}</Text>
                  <Image source={v.img} style={{width:20,resizeMode:Image.resizeMode.contain}}/>
            </TouchableOpacity>
            <Image source={require('../images/line.png')} style={{width:'100%',height:2,resizeMode:Image.resizeMode.contain}}/>
          </View>
          <View>
          <TouchableOpacity onPress={()=>navigate('correlationPlan')} style={{height:70,minWidth:'93%',alignItems:'center',flexDirection:'row'}} activeOpacity={.8}>
                  <Image source={require('../images/online_ticket.png')} style={{width:45,height:45,resizeMode:Image.resizeMode.contain,marginTop:2}}/>
                  <Text style={{fontWeight:'500',left:10,color:'white',fontSize:20,flex:1}}>{v.about}</Text>
                  <Image source={v.img} style={{width:20,resizeMode:Image.resizeMode.contain}}/>
          </TouchableOpacity>
          <Image source={require('../images/line.png')} style={{width:'100%',height:2,resizeMode:Image.resizeMode.contain}}/>
          </View>
          <View>
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
          </View>);
    }
  }