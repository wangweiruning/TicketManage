import React from 'react';
import {Text,View,ScrollView,Alert,TouchableOpacity,TextInput,Image} from 'react-native';
import {historys,gethistory,Searchhistory} from './../api/api'
import Title from './Title';
import DatePicker from 'react-native-datepicker'
import {ActivityIndicator } from 'antd-mobile-rn';
export default class HistoryPlan extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        animating: false,
        result:[],
        SelectData:[],
        value:'',
        havenotdate:false,
        mengCard:true
    };
  }

   async componentDidMount(){
    const {navigate} = this.props.navigation;
    // if(jconfig.userinfo.user==(""||null)){
    //   return Alert.alert(
    //     "登录超时",
    //     "登录状态已过期，请重新登录",
    //     [
    //       {text: '去登陆', onPress: () => navigate('login')},
    //     ],
    //     {cancelable:false}
    //   );
    // }
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
}

  async search(){
    let e = this.state.value
    let tim = `?form.search_from=${e}`
    let time = await Searchhistory(tim)
    console.log(e)
    if(!e){
      this.setState({
        result:this.state.SelectData.sort((a,b)=>{
          return  a.lastTime>b.lastTime?-1:1
        })
      });
      return;
    }
    else if(e){
      let newData = [];
      for (var i = 0; i <time.form.page.dataRows.length; i++) {
        let ds = time.form.page.dataRows[i];
        newData.push(ds);
    }
    this.setState({
      result:newData.sort((a,b)=>{
        return  a.lastTime>b.lastTime?-1:1
      })
    });
    }
  }

  testBlur(){
    this.refs.inputWR.blur();
  }


  render() {
      let result = this.state.result;
      return (<View style={{width:'100%',height:'100%'}}>
              <Title navigation={this.props.navigation} centerText={'历史流程'} />
              {/* 需要循环获取数据 */}
              <View style={{flex:1}}>
              {this.state.mengCard&&<View style={{justifyContent:'center',alignItems:'center',zIndex:444,width:"100%",height:"100%"}}>
              <ActivityIndicator color="#363434"/>
              <Text style={{color:"#363434",textAlign:"center",marginTop:10,fontSize:15}}>加载中...</Text>
              </View>}
              <View style={{width:'100%',justifyContent:"center",alignItems:'center',backgroundColor:'white'}}>
              <View style={{backgroundColor:'#eee',width:'97%',flexDirection:'row',borderRadius:15,alignItems:'center',height:40,marginTop:10}}> 
              <Image source={require('../images/search.png')} style={{width:20,height:20,marginLeft:8}}/>
                <TextInput onSubmitEditing={()=>{this.testBlur()}} ref="inputWR" underlineColorAndroid={'transparent'} multiline={true} autoFocus={false} onChangeText={(e)=>this.onChanegeTextKeyword(e)}
                  style={{fontSize:13, color: '#363434',overflow:'hidden',width:'98%'}}
                  placeholder={"请输入两票名称"}
              />
              </View>
              <DatePicker customStyles={{
                      dateInput: {
                      left:6,
                      justifyContent:'center',
                      borderWidth:0,
                      },
                      dateText:{
                          color:'#363434'
                      },
                      placeholderText:{
                          color:'#363434'
                      }
                    }}
                    date={this.state.value} 
                    style={{marginTop:10,justifyContent:'center',width:'100%',height:40,borderTopColor:"lightgrey",borderBottomColor:'lightgrey',borderTopWidth:1,borderBottomWidth:1,borderStyle:'solid'}}   
                    mode="datetime"        
                    format="YYYY-MM-DD HH:mm"
                    confirmBtnText="确定"
                    cancelBtnText="清空"
                    showIcon={true}
                    minDate={new Date(2015, 1, 1)}
                    placeholder={"请选择时间"}  
                    onCloseModal={()=>{this.setState({value:''});this.search()}} 
                    onDateChange={(e)=>{this.setState({value:e});this.search()}}
                    />
              </View>
              <ScrollView style={{marginTop:8}}>
                {result.length>0&&result.map((itemdata,index)=>{
                  return (<View style={{width:'100%',alignItems:'center'}} key={index}>
                  <TouchableOpacity key={index} activeOpacity={.8}
                  onPress={()=>this.gotoItem(itemdata)}
                  style={{marginBottom:8,width:"95.3%",backgroundColor:'white',flexDirection:'row'}}>
                  <View style={{width:'25%',alignItems:'center'}}>
                  <View style={{marginTop:13,width:51,height:52,borderRadius:25.5,justifyContent:'center',alignItems:'center',borderColor:"#ccc",borderWidth:1,borderStyle:'solid'}}>
                  <Image source={require('../images/history.png')} style={{width:30,height:30}}/>
                  </View>
                  <Text style={{color:"#333",fontSize:14,flexWrap:'wrap',width:60,marginTop:6.8,textAlign:'center',marginLeft:1.5}}>{itemdata.tickettypename}</Text>
                  </View>
                  <View style={{width:'75%'}}>
                    <Text style={{color:"#1296db",marginTop:8.7,fontSize:13.5}}>{itemdata.ticketserialnum}</Text>
                    <Text numberOfLines={3} ellipsizeMode='middle' style={{lineHeight:23,color:"#333",fontSize:15.9,width:'99%',marginTop:4.2}}>
                      {itemdata.content==""?'暂无内容':itemdata.content}
                    </Text>
                    <View style={{flexDirection:'row',marginTop:7.4,alignItems:'center'}}>
                    <Text style={{paddingLeft:.8,paddingRight:1,textAlign:'center',borderWidth:1,borderRadius:5,borderColor:'#1296db',borderStyle:"solid",color:'#1296db',fontSize:12,marginRight:5}}>负责</Text>
                    <Text style={{fontSize:14,color:"#333"}}>{itemdata.realname==null?'暂无负责人':itemdata.realname}</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',marginTop:3.7,marginBottom:6}}>
                      <Image source={require('../images/times.png')} style={{width:20,height:20,resizeMode:Image.resizeMode.contain}}/>
                      <Text style={{color:"#333",marginLeft:4.3,fontSize:14}}>
                          {itemdata.filltickettime.replace(/T/,' ')}
                      </Text>
                    </View>
                    </View>
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