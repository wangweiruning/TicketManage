import React from 'react';
import {  Text, View,TouchableOpacity ,Button,Alert,ScrollView} from 'react-native';
import Title from './Title'
import {awaitdeteal,historys} from './../api/api'
import MySorage from '../api/storage';
import PageListView from './PageListView'
import * as Animatable from 'react-native-animatable';
export default class WaitPlan extends React.Component{
  constructor(props) {
    MySorage._getStorage()
    super(props);
    this.state = {
      animating: false,
      result:'',
      userId:"",
      dataLis:[],
      havenotdate:false,
    };
  }
    async componentWillMount(){
        const {navigate} = this.props.navigation
        if(!jconfig.userinfo.status) {
           Alert.alert(
            "登录验证",
            "你还没有登录哦，请先登录再来吧",
            [
              {text: '返回', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: '去登陆', onPress: () => navigate('login')},
            ],
          );
        }
        const histo = await historys("?form.tree_node_operation="+0);
        const datas = "?form.userId="+histo.form.userId;
    const result = await awaitdeteal(datas);
    console.log(result.form.dataList,"1111111111111111")
        this.setState({
            userId:histo.form.userId,
            dataLis:result.form.dataList.reverse()
        })
        if(!result.form.dataList.length>0){
          this.setState({
            havenotdate:true
        })
        }
       

    }

  async  gotoItem(params){
        //跳转时传递参数 typeName：票名称 ticketNum:编号  templateID：工作票模板id（tickettemplateid） isAlter 常量1   _： 当前时间戳  departmentid部门id
        this.props.navigation.navigate('Result',{
                                                typeName:params.tickettypename,
                                                ticketNum:params.ticketserialnum,
                                                templateID:params.tickettemplateid,
                                                isAlter:1,
                                                ticketTypeId:params.ticketTypeId,
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

    // 20181107 刷新
 async _refresh(callBack){
    const histo = await historys("?form.tree_node_operation="+0);
     console.log(this.state.userId,"this.state.userId")
    const datas = "?form.userId="+histo.form.userId+"&pageSize=10&curPage=0";
    const result = await awaitdeteal(datas);
    console.log(result.form.dataList,"1111111111111111")
    callBack(result.form.dataList.reverse());
           if(result&&result.form.dataList.length>0){
          this.setState({
              result:this.state.result.concat(result.form.dataList),//序列化：转换为一个 (字符串)JSON字符串
          });
         }
   
  }
   
  // 20181107 加载更多
  async _loadMore(page,callBack){
    const histo = await historys("?form.tree_node_operation="+0);
     console.log(this.state.userId,"this.state.userId")
    const datas = "?form.userId="+histo.form.userId+"&pageSize=10&curPage="+page;
    const result = await awaitdeteal(datas);
    console.log(result.form.dataList,"222222222222222222")
    callBack(result.form.dataList);
           if(result&&result.form.dataList.length>0){
          this.setState({
              result:this.state.result.concat(result.form.dataList),//序列化：转换为一个 (字符串)JSON字符串
          });
        }
  }
   
  // 20181107 子组件渲染
  _renderRow(itemdata) {
    // <CommentItem row={row} />
    return (
      <View 
            onPress={()=>this.gotoItem(itemdata)}
            style={{marginTop:5,paddingBottom:10,paddingTop:10,width:"90%",marginLeft:20,height:220}}>
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
    )
  }
  awaitTime(time){
    let Times = time.replace(/-/g,"/").replace(/T/,' ');
    var endTime = new Date(Times).getTime() + 1000;
    let tian="",shi="",fen="";
    var syhm = Date.now()-endTime ; // 剩余毫秒
   
    tian = Math.floor(syhm / 1000 / 60 / 60 / 24)+"天";
    shi = Math.floor(syhm / 1000 / 60 / 60 % 24)+"时";
    fen = Math.floor(syhm / 1000 / 60 % 60)+"分";
   
 return tian+shi+fen;
  }
  render() {
      let height = this.state.result.length * 100;
      let dataLis = this.state.dataLis
    return (
      <View style={{flex:1}}>
        <Title navigation={this.props.navigation} centerText={'待处理流程'} />
        {/* 需要循环获取数据 */}
            <View style={{flex:1,backgroundColor:"#ffffff",marginTop:0}}>
            {/* {jconfig.userinfo.status?<PageListView
                height={height}
                pageLen={15}
                renderRow={this._renderRow.bind(this)}
                refresh={this._refresh.bind(this)}
                loadMore={this._loadMore.bind(this)}
            />:<Text style={{textAlign:"center",marginTop:20}}>还没有任何数据</Text>
            } */}
            <ScrollView>
         {  dataLis.length>0&&dataLis.map((itemdata,index)=>{
             return (
              <View key={index}
                    onPress={()=>this.gotoItem(itemdata)}
                    style={{marginTop:5,paddingBottom:10,paddingTop:10,width:"90%",marginLeft:20,height:220}}>
                     <Animatable.View key={index} useNativeDriver animation="fadeInRight" easing="ease-out-expo">
                <Text style={{color:"#000000"}}>两票类型：{itemdata.tickettypename}</Text>
                <Text style={{color:"#000000"}}>负责人：{itemdata.headuser}</Text>
                <Text style={{color:"#000000"}}>编号：{itemdata.ticketserialnum}</Text>
                <Text style={{color:"#000000"}}>流转人：{itemdata.manageuser}</Text>
                <View><Text style={{color:"#000000"}}>内容：</Text></View>
                <Text numberOfLines={10} style = {{paddingBottom:15,borderColor:"#eeeeee",borderWidth:1,borderStyle:"solid",color:"#000000"}}>{itemdata.content}</Text>
                <Text style={{color:"orange"}}>等待时间：{this.awaitTime(itemdata.lastTime)}</Text>
                <Text style={{color:"#000000"}}>流转时间：{itemdata.lastTime}</Text>
                <Button
                    onPress={()=>this.gotoItem(itemdata)}
                    title="查看详情"
                    color="#406ea4"
                    />
                </Animatable.View>
            </View>
            )
        })}
        {this.state.havenotdate&&<View style={{marginVertical:20}}><Text style={{textAlign:"center"}}>暂时没有数据！</Text></View>}
            </ScrollView>
            </View>
      </View>
    );
  }
}