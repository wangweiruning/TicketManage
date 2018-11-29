import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,ScrollView,Button,ToastAndroid,Alert,Image,ImageBackground} from 'react-native';
import Title from './Title'
import {correation,historys} from './../api/api'
import MySorage from '../api/storage';
import {ActivityIndicator } from 'antd-mobile-rn';
export default class CorrelationPlan extends React.Component{
  constructor(props) {
    MySorage._getStorage()
    super(props);
    this.state = {
        animating: false,
        result:[],
        userId:"",
        havenotdate:false,
        mengCard:true
        };
      }
    async  componentWillMount(){
         const {navigate} = this.props.navigation;
         if(!jconfig.userinfo.user){
          return Alert.alert(
            "登录超时",
            "登录状态已过期，请重新登录",
            [
              {text: '去登陆', onPress: () => navigate('login')},
            ],
            {cancelable:false}
          );
        }
    if(!jconfig.userinfo.status){
       return Alert.alert(
        "登录验证",
        "你还没有登录哦，请先登录再来吧",
        [
          {text: '去登陆', onPress: () => navigate('login')},
        ],
        {cancelable:false}
      );
    }else{
        const histo = await historys("?form.tree_node_operation="+0);
        const datas = "?form.userId="+histo.form.userId+"&pageSize=10&curPage=0";
                const result = await correation(datas);
                       if(result&&result.form.dataList.length>0){
                      this.setState({
                          userId:histo.form.userId,
                          result:result.form.dataList,//序列化：转换为一个 (字符串)JSON字符串
                          mengCard:false
                      });
                     }
                     if(!result.form.dataList.length>0){
                      this.setState({
                        havenotdate:true
                    })
                  }
                }
     }
    
     // 20180730 刷新
 async _refresh(callBack){
    const histo = await historys("?form.tree_node_operation="+0);
    
    const datas = "?form.userId="+histo.form.userId+"&pageSize=10&curPage=0";
    // const datas = "?form.userId="+histo.form.userId;
            const result = await correation(datas);
            callBack(result.form.dataList);
           
                   if(result&&result.form.dataList.length>0){
                  this.setState({
                      result:result.form.dataList,//序列化：转换为一个 (字符串)JSON字符串
                  });
                 }
   
  }
   
  // 20180730 加载更多
  async _loadMore(page,callBack){
    const histo = await historys("?form.tree_node_operation="+0);
    
    const datas = "?form.userId="+histo.form.userId+"&pageSize=10&curPage="+page;
    // const datas = "?form.userId="+histo.form.userId;
            const result = await correation(datas);
            callBack(result.form.dataList);
            
                   if(result&&result.form.dataList.length>0){
                  this.setState({
                      result:result.form.dataList.reverse(),//序列化：转换为一个 (字符串)JSON字符串
                      havenotdate:true,
                      mengCard:flase
                  });
                 }
  }
   
  // 20180730 子组件渲染
  _renderRow(itemdata) {
    return (
      <View 
            onPress={()=>this.gotoItem(itemdata)}
            style={{marginTop:5,paddingBottom:10,paddingTop:10,width:"90%",marginLeft:20,height:220}}>
        <Text style={{color:"#fff"}}>两票类型：{itemdata.tickettypename}</Text>
        <Text style={{color:"#fff"}}>负责人：{itemdata.headuser}</Text>
        <Text style={{color:"#fff"}}>编号：{itemdata.ticketserialnum}</Text>
        <Text style={{color:"#fff"}}>流转人：{itemdata.manageuser}</Text>
        <View><Text style={{color:"#fff"}}>内容：</Text></View>
        <Text numberOfLines={10} style = {{paddingBottom:15,borderColor:"#eeeeee",borderWidth:1,borderStyle:"solid",color:"#fff"}}>{itemdata.content}</Text>
        <Text style={{color:"#fff"}}>等待时间：{itemdata.manageTime}</Text>
        <Text style={{color:"#fff"}}>流转时间：{itemdata.lastTime}</Text>
        <Button
            onPress={()=>this.gotoItem(itemdata)}
            title="查看详情"
            color="#406ea4"
            />
    </View>
    )
  }
    gotoItem(params){
        //跳转时传递参数 typeName：票名称 ticketNum:编号  templateID：工作票模板id（TicketTemplateID） isAlter 常量1   _： 当前时间戳
        this.props.navigation.navigate('Result',{
            typeName:params.tickettypename,
            ticketNum:params.ticketserialnum,
            templateID:params.tickettemplateid,
            isAlter:1,
            isqianfa:false,
            departmentid:params.departmentid,
            ticketbasicinfoid:params.ticketbasicinfoid,
            userId:this.state.userId,
            canot:true,
            ishistory:true
          })
    }

  render() {
let height = this.state.result.length * 100;
let result = this.state.result;
    return (
      <ImageBackground source={require('../images/gffg.jpg')} style={{width: '100%', height: '100%'}}>
       
        <Title navigation={this.props.navigation} centerText={'相关流程'} />
        {/* 需要循环获取数据 */}
            <View style={{flex:1}}>
            {this.state.mengCard&&<View style={{justifyContent:'center',alignItems:'center',zIndex:444,width:"100%",height:"100%"}}>
            <ActivityIndicator color="#ffffff"/>
            <Text style={{color:"#ffffff",textAlign:"center",marginTop:10,fontSize:15}}>加载中...</Text>
            </View>}
            <ScrollView>
              {result.length>0&&result.map((itemdata,index)=>{
                 return (
                  <TouchableOpacity key={index}
                        onPress={()=>this.gotoItem(itemdata)}
                        style={{marginBottom:8,marginTop:8,paddingBottom:15,width:"95%",marginLeft:10.3,borderRadius:10,backgroundColor:'rgba(255,255,255,.2)'}}>
                    <Text numberOfLines={10} 
                    style = {{marginLeft:16,width:'91%',marginTop:20,
                              paddingBottom:10,borderBottomColor:"rgba(255,255,255,.3)",borderBottomWidth:1,borderStyle:"solid",color:"#fff",fontSize:18,flexWrap:'wrap'}}>{itemdata.content==""?'暂无内容':itemdata.content}</Text>
                    <Text style={{paddingTop:10,color:"#fff",marginLeft:16,fontSize:16}}>两票类型：{itemdata.tickettypename}</Text>
                    <Text style={{marginTop:6,color:"#fff",marginLeft:16,fontSize:16}}>负责人：{itemdata.headuser}</Text>
                    <Text style={{marginTop:6,color:"#fff",marginLeft:16,fontSize:16}}>编号：{itemdata.ticketserialnum}</Text>
                    <Text style={{marginTop:6,color:"#fff",marginLeft:16,fontSize:16}}>流转人：{itemdata.manageuser}</Text>
                    <Text style={{marginTop:6,color:"#fff",marginBottom:7,marginLeft:16,fontSize:16}}>处理时间：{itemdata.managetime.replace(/T/,' ')}</Text>
                </TouchableOpacity>
                )
              })}
              {this.state.havenotdate&&<View style={{marginVertical:20}}><Text style={{textAlign:"center",fontSize:16}}>暂时没有数据！</Text></View>}
            </ScrollView>
            </View>
      </ImageBackground>
    );
  }
}