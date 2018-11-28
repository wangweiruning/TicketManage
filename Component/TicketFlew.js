import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity ,ScrollView,Button,Alert,ToastAndroid,Image,ImageBackground} from 'react-native';
import Title from './Title'
import TicketTitle from './TicketTitle'
import {searchFlowRecord} from './../api/api'
import MySorage from '../api/storage';
import * as Animatable from 'react-native-animatable';
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
   
    async submitgo(){
        if(!jconfig.userinfo) return ToastAndroid.show('请登录',ToastAndroid.SHORT);
        let ghr = `?form.basicInfoId=${this.props.navigation.state.params.basicInfoId}`;
        let result = await searchFlowRecord(ghr);
        let arr0 = result.form.dataList[0];
        let arrs =result.form.dataList;
        if(this.props.navigation.state.params.ishistory){
            arrs = result.form.dataList.slice(1,result.form.dataList.length);
            arrs = arrs.concat(arr0)
        }
               if(result&&arrs.length>0){
              this.setState({
                  result:arrs,//序列化：转换为一个 (字符串)JSON字符串
              });
             }
}
    itemdata(time){
        if(time==null){
            return "0小时"
        }else{
        let Times = time.replace(/-/g,"/").replace(/T/,' ');
        var endTime = new Date(Times).getTime() + 1000;
        let tian="",shi="",fen="";
        var syhm = Date.now()-endTime ; // 剩余毫秒
    
        tian = Math.floor(syhm / 1000 / 60 / 60 / 24)+"天";
        shi = Math.floor(syhm / 1000 / 60 / 60 % 24)+"时";
        fen = Math.floor(syhm / 1000 / 60 % 60)+"分";
        return tian+shi+fen;
        }
    }
    awaitTime(time){
       return this.itemdata(time)
    }
     showpage(){
        let itemdatas = this.state.result;
        
        if (itemdatas.length>0) {
            let awaitTime = itemdatas[itemdatas.length-2].ManageTime;
            return  itemdatas.map((itemdata,i)=>{
                
                return <Animatable.View key={i} style={{alignItems:'center'}} useNativeDriver animation="fadeInRight" easing="ease-out-expo">
                <View  style={{
                                marginTop:5,
                                paddingBottom:10,
                                paddingTop:10,
                                width:"95%",
                                backgroundColor:itemdata.ticketstatusname=="开票"
                                                ?"#4c71c0":itemdata.ticketstatusname=="签发"
                                                ?"#45b9bd":itemdata.ticketstatusname=="许可"
                                                ?"#09a9ec":itemdata.ticketstatusname=="执行"
                                                ?"#af69aa":itemdata.ticketstatusname=="终结"
                                                ?"#af6900":itemdata.ticketstatusname=="延期"
                                                ?"#886900":itemdata.ticketstatusname=="负责人变动"
                                                ?"#88ff00":itemdata.ticketstatusname=="人员变动"
                                                ?"#08aabc":itemdata.ticketstatusname=="开收工时间"
                                                ?"#3a6a45":itemdata.ticketstatusname=="工作终结"
                                                ?"#a900a1":itemdata.ticketstatusname=="作废"
                                                ?"#0880bc":itemdata.ticketstatusname=="验收"
                                                ?"#6975a1":itemdata.ticketstatusname=="作废"
                                                ?"#999999":"red"
                                }}>
                                <View>
                        <Text style={{color:"white",fontSize:16}}>  两票状态：{itemdata.ticketstatusname}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{itemdata.ticketrolename}</Text>
                        <Text style={{color:"white",fontSize:16}}>  处理人：{itemdata.ManageTime==null?"":itemdata.RealName}</Text>
                        <Text style={{color:"white",fontSize:16}}> {itemdata.ManageTime==null?" 等待时间":" 处理周期"}：{itemdata.ManageTime==null?this.awaitTime(awaitTime):itemdata.TimePeriod+"小时"}</Text>
                        <Text style={{color:"white",fontSize:16}}>  处理意见：{itemdata.RecordOption==1?'同意':itemdata.RecordOption==""?"待处理":'不同意'}</Text>
                        <Text style={{color:"white",fontSize:16}}>  处理时间：{itemdata.ManageTime!=null?itemdata.ManageTime.replace(/T/,' '):"待处理"}</Text>
                    </View></View>
                    </Animatable.View>
            })
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
    return (
        <ImageBackground source={require('../images/gffg.jpg')} style={{width: '100%', height: '100%'}}>
        
        {/* <Title navigation={this.props.navigation} centerText={this.props.navigation.state.params.name+"流程"} /> */}
        <TicketTitle navigation={this.props.navigation}  centerText={this.props.navigation.state.params.name+"流程"}/> 
        {/* 需要循环获取数据 */}
        <ScrollView style={{marginBottom:5,width:'100%'}}>
        {/* <TouchableOpacity> */}
                {this.showpage()}
        {/* </TouchableOpacity> */}
        </ScrollView>
      </ImageBackground>
    );
  }
}