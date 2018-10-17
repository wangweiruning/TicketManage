import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,ScrollView,Button } from 'react-native';
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
        if(!jconfig.userinfo.user) return ToastAndroid.show('请登录',ToastAndroid.SHORT);
            const datas = "?form.userId="+jconfig.userinfo.user;
            const result = await correation(datas);
            console.log(result.form.dataList,"0000000000000000000000")
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
                return  itemdatas.map((itemdata)=>{
                    return <View 
                                key={itemdata.tickettemplateid}
                                onPress={()=>this.gotoItem(itemdata)}
                                style={{marginTop:5,paddingBottom:10,paddingTop:10,color:"#000000",width:"90%",marginLeft:20}}>
                            <Text style={{color:"#000000"}}>两票类型：{itemdata.tickettypename}</Text>
                            <Text style={{color:"#000000"}}>负责人：{itemdata.headuser}</Text>
                            <Text style={{color:"#000000"}}>编号：{itemdata.ticketserialnum}</Text>
                            <Text style={{color:"#000000"}}>流转人：{itemdata.manageuser}</Text>
                            <View><Text style={{color:"#000000"}}>内容：</Text></View>
                            <Text numberOfLines={10} style = {{paddingBottom:15,borderColor:"#eeeeee",borderWidth:1,borderStyle:"solid",color:"#000000"}}>{itemdata.content}</Text>
                            <Text style={{color:"#000000"}}>等待时间：{itemdata.manageTime}</Text>
                            <Text style={{color:"#000000"}}>流转时间：{itemdata.lastTime}</Text>
                            <Button
                                onPress={()=>navigate('litile',{ticketserialnum:itemdata.ticketserialnum})}
                                title="查看详情"
                                color="#406ea4"
                                />
                        </View>
                })
            } else {
                return <View 
                onPress={()=>this.gotoItem(itemdata)}
                style={{marginTop:5,paddingBottom:10,paddingTop:10,color:"#000000",width:"90%",marginLeft:20}}>
            <Text style={{color:"#000000",textAlign:"center",marginTop:10,marginBottom:10}}>暂时没有数据~~</Text>
            <Button
                onPress={()=>this.submitgo()}
                title="获取数据"
                color="#406ea4"
                />
        </View>
            }
            
         }
    
    
        gotoItem(params){
            //跳转时传递参数 typeName：票名称 ticketNum:编号  templateID：工作票模板id（TicketTemplateID） isAlter 常量1   _： 当前时间戳
            this.props.navigation.navigate('litile',{
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