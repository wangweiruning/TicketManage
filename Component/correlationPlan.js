import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,ScrollView,Button,ToastAndroid,Alert} from 'react-native';
import Title from './Title'
import {correation} from './../api/api'
import MySorage from '../api/storage';
export default class CorrelationPlan extends React.Component{
  constructor(props) {
    MySorage._getStorage()
    super(props);
    this.state = {
        animating: false,
        result:'',
        };
      }
    async  componentDidMount(){
        await  this.submitgo()
     }
        getDate(item){
            console.log("获取数据")
        }
    async  submitgo(){
        const {navigate} = this.props.navigation
        if(!jconfig.userinfo.status) return Alert.alert(
            "登录验证",
            "你还没有登录哦，请先登录再来吧",
            [
              {text: '返回', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: '去登陆', onPress: () => navigate('login')},
            ],
          );
            const datas = "?form.userId="+jconfig.userinfo.user;
            const result = await correation(datas);
            console.log(result.form.dataList,"获取相关流程")
                   if(result&&result.form.dataList.length>0){
                  this.setState({
                      result:result.form.dataList,//序列化：转换为一个 (字符串)JSON字符串
                  });
                 }  
    }
    
    showpage(){
        let itemdatas = this.state.result;
        const { navigate } = this.props.navigation;
        console.log(itemdatas,"1211")
            if (itemdatas.length>0) {
                return  itemdatas.map((itemdata,i)=>{
                    return <View 
                                key={i}
                                style={{marginTop:5,paddingBottom:10,paddingTop:10,width:"90%",marginLeft:20}}>
                            <Text style={{color:"#000000"}}>两票类型：{itemdata.tickettypename}</Text>
                            <Text style={{color:"#000000"}}>负责人：{itemdata.headuser}</Text>
                            <Text style={{color:"#000000"}}>编号：{itemdata.ticketserialnum}</Text>
                            <Text style={{color:"#000000"}}>流转人：{itemdata.manageuser}</Text>
                            <View><Text style={{color:"#000000"}}>内容：</Text></View>
                            <Text numberOfLines={10} style = {{paddingBottom:15,borderColor:"#eeeeee",borderWidth:1,borderStyle:"solid",color:"#000000"}}>{itemdata.content}</Text>
                            <Text style={{color:"#000000"}}>等待时间：{itemdata.manageTime}</Text>
                            <Text style={{color:"#000000"}}>流转时间：{itemdata.lastTime}</Text>
                            <Button
                                onPress={()=>this.gotoItem(itemdata)}
                                title="查看详情"
                                color="#406ea4"
                                />
                        </View>
                })
            } else {
                return <View 
                onPress={()=>this.gotoItem(itemdata)}
                style={{marginTop:5,paddingBottom:10,paddingTop:10,width:"90%",marginLeft:20}}>
            <Text style={{color:"#000000",textAlign:"center",marginTop:10,marginBottom:10}}>暂时没有数据~~</Text>
        </View>
            }
            
         }
    
    
        gotoItem(params){
            //跳转时传递参数 typeName：票名称 ticketNum:编号  templateID：工作票模板id（TicketTemplateID） isAlter 常量1   _： 当前时间戳
            this.props.navigation.navigate('Result',{
                typeName:params.tickettypename,
                ticketNum:params.ticketserialnum,
                templateID:params.tickettemplateid,
                isAlter:1,
                _:Date.parse(new Date())})
        }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View>
        <Title navigation={this.props.navigation} centerText={'相关流程'} />
        <ScrollView style={{marginBottom:50}}>
        {/* <TouchableOpacity> */}
            <View style={{backgroundColor:"#ffffff",marginTop:10}}>
             {this.showpage()}
            </View>
        {/* </TouchableOpacity> */}
        </ScrollView>
      </View>
    );
  }
}