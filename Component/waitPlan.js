import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity ,ScrollView,Button,Alert,ToastAndroid} from 'react-native';
import Title from './Title'
import {awaitdeteal} from './../api/api'
import MySorage from '../api/storage';
export default class WaitPlan extends React.Component{
  constructor(props) {
    MySorage._getStorage()
    super(props);
    this.state = {
      animating: false,
      result:'',
    //   result:[{
    //     tickettypename:'水力自控工作票',
    //     headuser:'央研究院11',
    //     ticketserialnum:'1',
    //     manageuser:'超级管理员',
    //     content:'222222222',
    //     managetime:'2018-09-27T15:06:01',
    //     lastTime:'2018-09-27T15:06:01'
    //   }]
    };
  }
    async componentDidMount(){
       await this.submitgo()
        this.showpage()
    }
    getDate(item){
        console.log("获取数据")
   
    }
    async submitgo(){
        console.log("qwqw:",jconfig);
        if(!jconfig.userinfo.user) return ToastAndroid.show('请登录',ToastAndroid.SHORT);
        const datas = "?form.userId="+jconfig.userinfo.user;
        console.log(datas,'hhhhhhhhhhj')
        const result = await awaitdeteal(datas);
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
        console.log(itemdatas)
        if (itemdatas.length>0) {
     
            return  itemdatas.map((itemdata,i)=>{
                return <View key={i}
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
    return (
      <View>
        <Title navigation={this.props.navigation} centerText={'待处理流程'} />
        {/* 需要循环获取数据 */}
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