import React from 'react';
import {  Text, View ,TouchableOpacity,Alert,ScrollView,Image,ImageBackground} from 'react-native';
import Title from './Title'
import {awaitdeteal,historys} from './../api/api'
import {ActivityIndicator } from 'antd-mobile-rn';
import MySorage from '../api/storage';
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
      mengCard:true
    };
  }
    async componentWillMount(){
        const {navigate} = this.props.navigation
        if(jconfig.userinfo.user==(""||null)){
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
        }else{
        const histo = await historys("?form.tree_node_operation="+0);
        const datas = "?form.userId="+histo.form.userId;
    const result = await awaitdeteal(datas);
    
        this.setState({
            userId:histo.form.userId,
            dataLis:result.form.dataList.reverse(),
            mengCard:false
        })
        if(!result.form.dataList.length>0){
          this.setState({
            havenotdate:true
        })
        }
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
                                                ishistory:true,
                                                _:Date.parse(new Date())})
    }

    // 20181107 刷新
 async _refresh(callBack){
    const histo = await historys("?form.tree_node_operation="+0);
    const datas = "?form.userId="+histo.form.userId+"&pageSize=10&curPage=0";
    const result = await awaitdeteal(datas);
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
    const datas = "?form.userId="+histo.form.userId+"&pageSize=10&curPage="+page;
    const result = await awaitdeteal(datas);
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
    var syhm = Date.now() -endTime ; // 剩余毫秒
    tian = Math.floor(syhm / 1000 / 60 / 60 / 24)+"天";
    shi = Math.floor(syhm / 1000 / 60 / 60 % 24)+"时";
    fen = Math.floor(syhm / 1000 / 60 % 60)+"分";
   
 return tian+shi+fen;
  }
  render() {
      let height = this.state.result.length * 100;
      let dataLis = this.state.dataLis;
    return (
      <ImageBackground source={require('../images/gffg.jpg')} style={{width: '100%', height: '100%'}}>
        <Title navigation={this.props.navigation} centerText={'待处理流程'} />
        {/* 需要循环获取数据 */}
            <View style={{flex:1}}>
            {/* {jconfig.userinfo.status?<PageListView
                height={height}
                pageLen={15}
                renderRow={this._renderRow.bind(this)}
                refresh={this._refresh.bind(this)}
                loadMore={this._loadMore.bind(this)}
            />:<Text style={{textAlign:"center",marginTop:20}}>还没有任何数据</Text>
            } */}
            {this.state.mengCard&&<View style={{justifyContent:'center',alignItems:'center', zIndex:444,width:"100%",height:"100%"}}>
                <ActivityIndicator color="#ffffff"/>
                <Text style={{color:"#ffffff",textAlign:"center",marginTop:10,fontSize:15}}>加载中...</Text>
                </View>}
            <ScrollView>
         {  dataLis.length>0&&dataLis.map((itemdata,index)=>{
             return (
              <TouchableOpacity key={index} activeOpacity={.8}
                    onPress={()=>this.gotoItem(itemdata)}
                    style={{marginTop:8,marginBottom:8,paddingBottom:15,width:"95%",borderRadius:10,backgroundColor:'rgba(255,255,255,.2)',marginLeft:10.3}}>
                <Text numberOfLines={10} 
                    style = {{marginLeft:16,width:'91%',marginTop:20,
                              paddingBottom:10,borderBottomColor:"rgba(255,255,255,.3)",
                              borderBottomWidth:1,borderStyle:"solid",color:"#fff",
                              fontSize:18,flexWrap:'wrap'}}>{itemdata.content==""?'暂无内容':itemdata.content}</Text>  
                <Text style={{color:"#fff",paddingTop:10,marginLeft:16,fontSize:16}}>两票类型：{itemdata.tickettypename}</Text>
                <Text style={{color:"#fff",marginTop:6,marginLeft:16,fontSize:16}}>负责人：{itemdata.headuser}</Text>
                <Text style={{color:"#fff",marginTop:6,marginLeft:16,fontSize:16}}>编号：{itemdata.ticketserialnum}</Text>
                <Text style={{color:"#fff",marginTop:6,marginLeft:16,fontSize:16}}>流转人：{itemdata.manageuser}</Text>
                <Text style={{color:"#ff8800",marginTop:6,marginLeft:16,fontSize:16}}>等待时间：{this.awaitTime(itemdata.lastTime)}</Text>
                <Text style={{color:"#fff",marginTop:6,marginBottom:7,marginLeft:16,fontSize:16}}>流转时间：{itemdata.lastTime.replace(/T/,' ')}</Text>
            </TouchableOpacity>
            )
        })}
        {this.state.havenotdate&&<View style={{marginVertical:20}}><Text style={{textAlign:"center",fontSize:16,color:"#fff"}}>暂时没有数据！</Text></View>}
            </ScrollView>
            </View>
      </ImageBackground>
    )
  }
}