import React from 'react';
import {Text,View,ScrollView,Alert,TouchableOpacity,TextInput,Image} from 'react-native';
import {historys,gethistory} from './../api/api'
import Title from './Title'
import {ActivityIndicator } from 'antd-mobile-rn';
export default class HistoryPlan extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        animating: false,
        result:[],
        SelectData:[],
        havenotdate:false,
        mengCard:true
    };
  }

   async componentDidMount(){
    const {navigate} = this.props.navigation;
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

      if(result){
      this.setState({
          result:result.form.page.dataRows.sort((a,b)=>{
            return  a.lastTime>b.lastTime?-1:1
          }),
          SelectData:result.form.page.dataRows,//序列化：转换为一个 (字符串)JSON字符串
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

onChanegeTextKeyword(text){
  if(!text){
    this.setState({
      result:this.state.SelectData.sort((a,b)=>{
        return  a.lastTime>b.lastTime?-1:1
      })
    });
    return;
   }

  else if(text){
    let newData = [];
    for (var i = 0; i < this.state.result.length; i++) {
        let ds = this.state.result[i];
        if(ds.tickettypename && ds.tickettypename.indexOf(text)!=-1){
          newData.push(ds);
        }
    }
    this.setState({
      result:newData.sort((a,b)=>{
        return  a.lastTime>b.lastTime?-1:1
      })
    });
  }
    // else{
    //   console.log('fffffffffff')
    //   this.setState({
    //     dataLis
    //   });
    //   }
}


  render() {
      // let height = this.state.result.length * 100;
      let result = this.state.result;
      return (<View style={{width:'100%',height:'100%'}}>
              <Title navigation={this.props.navigation} centerText={'历史流程'} />
              {/* 需要循环获取数据 */}
              <View style={{flex:1}}>
              {this.state.mengCard&&<View style={{justifyContent:'center',alignItems:'center',zIndex:444,width:"100%",height:"100%"}}>
              <ActivityIndicator color="#363434"/>
              <Text style={{color:"#363434",textAlign:"center",marginTop:10,fontSize:15}}>加载中...</Text>
              </View>}
              <View style={{width:'100%',justifyContent:"center",alignItems:'center',backgroundColor:'white',height:70}}>
              <View style={{backgroundColor:'#eee',width:'97%',flexDirection:'row',borderRadius:15,alignItems:'center'}}> 
              <Image source={require('../images/search.png')} style={{width:20,height:20,marginLeft:8}}/>
                <TextInput underlineColorAndroid={'transparent'} multiline={true} autoFocus={false} onChangeText={(e)=>this.onChanegeTextKeyword(e)}
                  style={{fontSize:13, color: '#363434',overflow:'hidden',width:'98%'}}
                  placeholder={"请输入两票名称"}
              />
              </View>
              </View>
              <ScrollView>
                {result.length>0&&result.map((itemdata,index)=>{
                  return (<View style={{width:'100%',alignItems:'center'}} key={index}>
                  <TouchableOpacity key={index} activeOpacity={.8}
                  onPress={()=>this.gotoItem(itemdata)}
                  style={{marginTop:8,marginBottom:8,paddingBottom:15,width:"95%",backgroundColor:'white',borderRadius:10}}>
                  <Text numberOfLines={10} 
                  style = {{marginLeft:16,width:'91%',marginTop:10,paddingBottom:10,borderBottomColor:"rgba(0,0,0,.5)",
                            borderBottomWidth:1,borderStyle:"solid",color:"#363434",fontSize:18,flexWrap:'wrap'}}>{itemdata.content==""?'暂无内容':itemdata.content}</Text>
                  <Text style={{paddingTop:10,color:"#363434",marginLeft:16,fontSize:16}}>两票类型：{itemdata.tickettypename}</Text>
                  <Text style={{marginTop:6,color:"#363434",marginLeft:16,fontSize:16}}>两票编号：{itemdata.ticketserialnum}</Text>
                  <Text style={{marginTop:6,color:"#363434",marginLeft:16,fontSize:16}}>工作负责人：{itemdata.realname==null?'暂无工作负责人':itemdata.realname}</Text>
                  <Text style={{marginTop:10,color:"#1296db",marginBottom:7,marginLeft:16,fontSize:16}}>开票时间：{itemdata.filltickettime}</Text>
                  </TouchableOpacity>
                </View>)
                })}
                {this.state.havenotdate&&<View style={{marginVertical:20}}><Text style={{textAlign:"center",fontSize:16,color:"#363434"}}>暂时没有数据！</Text></View>}
              </ScrollView>
              </View>
        </View>
    );
  }
}