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
      userId:""
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
        const result = await awaitdeteal(datas);
        console.log(result.form.dataList,"0000000000000000000000")
               if(result&&result.form.dataList.length>0){
              this.setState({
                  result:result.form.dataList,//序列化：转换为一个 (字符串)JSON字符串
                  userId:result.form.userId
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
            style={{marginTop:5,paddingBottom:10,paddingTop:10,width:"90%",marginLeft:20}}>
        <Text style={{color:"#000000",textAlign:"center",marginTop:10,marginBottom:10}}>暂时没有数据~~</Text>
    </View>
        }
        
     }


    gotoItem(params){
        //跳转时传递参数 typeName：票名称 ticketNum:编号  templateID：工作票模板id（tickettemplateid） isAlter 常量1   _： 当前时间戳  departmentid部门id
        this.props.navigation.navigate('Result',{
                                                typeName:params.tickettypename,
                                                ticketNum:params.ticketserialnum,
                                                templateID:params.tickettemplateid,
                                                isAlter:1,
                                                departmentid:params.departmentid,
                                                userId:this.state.userId,
                                                isqianfa:true,
                                                ticketstatusname:params.ticketstatusname,//状态名字
                                                ticketbasicinfoid:params.ticketbasicinfoid,//票基本信息id
                                                ticketroleid:params.ticketroleid,//roleid
                                                recordoption:params.recordoption,
                                                flowroleid:params.flowroleid,
                                                detailinfo:params.detailinfo,
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