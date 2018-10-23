import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity ,ScrollView,Button,Alert,ToastAndroid} from 'react-native';
import Title from './Title'
import {searchTicketFlow} from './../api/api'
import MySorage from '../api/storage';
export default class TicketFlew extends React.Component{
  constructor(props) {
    MySorage._getStorage()
    super(props);
    this.state = {
      animating: false,
      result:'',
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
        if(!jconfig.userinfo) return ToastAndroid.show('请登录',ToastAndroid.SHORT);
        let ghr = `?form.ticketTypeName=${this.props.navigation.state.params.centerText}`;
        let result = await searchTicketFlow(ghr);
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
                            style={{
                                marginTop:5,
                                paddingBottom:10,
                                paddingTop:10,
                                width:"90%",
                                marginLeft:20,
                                backgroundColor:itemdata.ticketstatusname=="开票"
                                                ?"#4c71c0":itemdata.ticketstatusname=="签发"
                                                ?"#45b9bd":itemdata.ticketstatusname=="许可"
                                                ?"#09a9ec":itemdata.ticketstatusname=="执行"
                                                ?"#af69aa":itemdata.ticketstatusname=="终结"
                                                ?"#af6900":itemdata.ticketstatusname=="延期"
                                                ?"#886900":itemdata.ticketstatusname=="负责人变动"
                                                ?"#88ff00":itemdata.ticketstatusname=="人员变动"
                                                ?"#0880bc":itemdata.ticketstatusname=="验收"
                                                ?"#6975a1":itemdata.ticketstatusname=="作废"
                                                ?"#999999":"#ffffff"
                                }}>
                        <Text style={{color:"#000000"}}>两票状态：{itemdata.ticketstatusname}</Text>
                        <Text style={{color:"#000000"}}>负责人：{itemdata.ticketrolename}</Text>
                        <Text style={{color:"#000000"}}>处理人：{itemdata.ticketrolename}</Text>
                        <Text style={{color:"#000000"}}>处理周期：{itemdata.ticketrolerank}</Text>
                        <View><Text style={{color:"#000000"}}>处理意见：{itemdata.tickettypeid}</Text></View>
                        {/* <Button
                            onPress={()=>this.gotoItem(itemdata)}
                            title="查看详情"
                            color="#406ea4"
                            /> */}
                    </View>
            })
        } else {
            return <View 
            onPress={()=>this.gotoItem(itemdata)}
            style={{marginTop:5,paddingBottom:10,paddingTop:10,width:"90%",marginLeft:20}}>
        <Text style={{color:"#000000",textAlign:"center",marginTop:10,marginBottom:10}}>没有流程</Text>
        {/* <Button
            onPress={()=>this.submitgo()}
            title="获取"
            color="#406ea4"
            /> */}
    </View>
        }
        
     }


    gotoItem(params){
        //跳转时传递参数 typeName：票名称 ticketNum:编号  templateID：工作票模板id（tickettemplateid） isAlter 常量1   _： 当前时间戳
        this.props.navigation.navigate('Result',{
                                                typeName:params.tickettypename,
                                                ticketNum:params.ticketserialnum,
                                                templateID:params.tickettemplateid,
                                                isAlter:1,
                                                _:Date.parse(new Date())})
    }
  render() {
      console.log(this.props.navigation)
    return (
      <View>
        <Title navigation={this.props.navigation} centerText={this.props.navigation.state.params.centerText+"流程"} />
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