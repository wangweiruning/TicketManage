import React from 'react';
import {Text, View,ScrollView ,Alert,TouchableOpacity} from 'react-native';
import {historys,gethistory} from './../api/api'
import Title from './Title'
import {ActivityIndicator } from 'antd-mobile-rn';
import PageListView from './PageListView'
export default class HistoryPlan extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        animating: false,
        result:[],
        havenotdate:false,
        mengCard:true
    };
  }

   async componentDidMount(){
    const {navigate} = this.props.navigation
    if(!jconfig.userinfo.status) return Alert.alert(
        "登录验证",
        "你还没有登录哦，请先登录再来吧",
        [
          {text: '去登陆', onPress: () => navigate('login')},
        ],
        {cancelable:false}
      );
      const datas = "?form.tree_node_operation="+0+"&form.page.pageSize=100&form.page.curPageNo=1";
      const result = await historys(datas);
      console.log(result.form.page.dataRows,"获取历史流程")

      if(result){
      this.setState({
          result:result.form.page.dataRows.reverse(),//序列化：转换为一个 (字符串)JSON字符串
          mengCard:false
      });
    }
    if(!result.form.page.dataRows.length>0){
      this.setState({
        havenotdate:true
    })
  }
  }

  async gotoItem(params){

    const items ="?form.jqgrid_row_selected_id="+params.id;
    let getLIshi = await gethistory(items);
    let ttt = JSON.parse(getLIshi.form.dataJson);
    let sss= ttt.sendParameterList[0];
    console.log(sss)
    //跳转时传递参数 typeName：票名称 ticketNum:编号  templateID：工作票模板id（tickettemplateid） isAlter 常量1   _： 当前时间戳  departmentid部门id
    this.props.navigation.navigate('Result',{
                                            typeName:sss.tickettypename,
                                            ticketNum:sss.ticketserialnum,
                                            templateID:sss.tickettemplateid,
                                            ticketTypeId:sss.ticketTypeId,
                                            departmentid:sss.departmentid,
                                            userId:sss.userId,
                                            isqianfa:false,
                                            ticketstatusname:sss.ticketstatusname,//状态名字
                                            ticketbasicinfoid:sss.ticketbasicinfoid,//票基本信息id
                                            canot:true,
                                            ishsitory:true
})
}


  render() {
      // let height = this.state.result.length * 100;
      let result = this.state.result;
      return (
        <View style={{flex:1,backgroundColor:'#f5f5f5'}}>
          <Title navigation={this.props.navigation} centerText={'历史流程'} />
          {/* 需要循环获取数据 */}
              <View style={{flex:1}}>
              {this.state.mengCard&&<View style={{justifyContent:'center',alignItems:'center',zIndex:444,width:"100%",height:"100%",backgroundColor:"lightgray"}}>
              <ActivityIndicator color="#03c1eb"/>
              <Text style={{color:"#007aff",textAlign:"center",marginTop:10,fontSize:15}}>加载中...</Text>
              </View>}
              <ScrollView>
                {result.length>0&&result.map((itemdata,index)=>{
                  return <View key={index}
                  style={{marginTop:8,marginBottom:8,paddingBottom:15,width:"95%",marginLeft:11,backgroundColor:'white',borderRadius:10}}>
                  <Text numberOfLines={10} style = {{marginLeft:16,width:'93%',marginTop:20,paddingBottom:15,borderColor:"#eeeeee",borderWidth:1,borderStyle:"solid",color:"#000000",padding:4,fontSize:16}}>{itemdata.content==""?'暂无内容':itemdata.content}</Text>
                  <Text style={{marginTop:5,color:"#000000",marginLeft:16,fontSize:16}}>两票类型：{itemdata.tickettypename}</Text>
                  <Text style={{marginTop:5,color:"#000000",marginLeft:16,fontSize:16}}>两票编号：{itemdata.ticketserialnum}</Text>
                  <Text style={{marginTop:5,color:"#000000",marginLeft:16,fontSize:16}}>工作负责人：{itemdata.realname==null?'暂无工作负责人':itemdata.realname}</Text>
                  {/* <View><Text style={{marginTop:3,color:"#000000",marginLeft:16}}>内容：</Text></View> */}
                  <Text style={{marginTop:5,color:"#000000",marginBottom:7,marginLeft:16,fontSize:16}}>开票时间：{itemdata.filltickettime}</Text>
                  <View style={{width:'100%',alignItems:'center',marginTop:7}}>
                <TouchableOpacity onPress={()=> this.gotoItem(itemdata)} style={{elevation:2,justifyContent:'center',alignItems:'center',width:'80%',backgroundColor:'#4c70b9',borderRadius:5,height:40}}>
                   <Text style={{color:'white',fontSize:20,fontWeight:'500'}}>查看详情</Text>
                </TouchableOpacity>
                </View>
                </View>
                })}
                {this.state.havenotdate&&<View style={{marginVertical:20}}><Text style={{textAlign:"center",fontSize:16}}>暂时没有数据！</Text></View>}
              </ScrollView>
              </View>
        </View>
    );
  }
}