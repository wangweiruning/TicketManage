import React from 'react';
import {Text,View,TouchableOpacity,Alert,ScrollView,Image,TextInput} from 'react-native';
import Title from './Title'
import HttpUtils from '../api/Httpdata3';
// import {awaitdeteal,historys} from './../api/api'
import {ActivityIndicator} from 'antd-mobile-rn';
import MySorage from '../api/storage';
export default class WaitPlan extends React.Component{
  constructor(props) {
    MySorage._getStorage()
    super(props);
    this.state = {
      http:jconfig.netWorkIp?jconfig.netWorkIp:'http://59.172.204.182:8030/ttms',
      animating: false,
      result:'',
      userId:"",
      dataLis:[],
      SelectData:[],
      havenotdate:false,
      mengCard:true
    };
  }
    async componentWillMount(){
        const {navigate} = this.props.navigation
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
        const histo = await HttpUtils.AjaxData(`${this.state.http}/ticketMng/ticketMng_loadGrid.action`,"?form.tree_node_operation="+0) //historys("?form.tree_node_operation="+0);
        const datas = "?form.userId="+histo.form.userId;
        const result = await HttpUtils.AjaxData(`${this.state.http}/ticketMng/ticketMng_searchUnhandle.action`,datas) //awaitdeteal(datas);
    
        this.setState({
            userId:histo.form.userId,
            dataLis:result.form.dataList.sort((a,b)=>{
              return  a.lastTime>b.lastTime?-1:1
            }),
            SelectData:result.form.dataList,
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


  onChanegeTextKeyword(text){
    if(!text){
      this.setState({
        dataLis:this.state.SelectData.sort((a,b)=>{
          return  a.lastTime>b.lastTime?-1:1
        })
      });
      return;
     }

    else if(text){
      let newData = [];
      for (var i = 0; i < this.state.dataLis.length; i++) {
          let ds = this.state.dataLis[i];
          if(ds.tickettypename && ds.tickettypename.indexOf(text)!=-1){
            newData.push(ds);
          }
      }
      this.setState({
        dataLis:newData.sort((a,b)=>{
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

  testBlur(){
    this.refs.inputWR.blur();
  }

  render() {
    let dataLis = this.state.dataLis;
    return (
      <View style={{width: '100%', height: '100%'}}>
        <Title navigation={this.props.navigation} centerText={'待处理流程'} />
        {/* 需要循环获取数据 */}
            <View style={{flex:1}}>
            {this.state.mengCard&&<View style={{justifyContent:'center',alignItems:'center', zIndex:444,width:"100%",height:"100%"}}>
                <ActivityIndicator color="#363434"/>
                <Text style={{color:"#363434",textAlign:"center",marginTop:10,fontSize:15}}>加载中...</Text>
                </View>}
        <View style={{width:'100%',justifyContent:"center",alignItems:'center',backgroundColor:'white',height:60}}>
         <View style={{backgroundColor:'#eee',width:'97%',flexDirection:'row',borderRadius:15,alignItems:'center',height:40}}> 
         <Image source={require('../images/search.png')} style={{width:20,height:20,marginLeft:8}}/>
          <TextInput onSubmitEditing={()=>this.testBlur()} ref="inputWR" underlineColorAndroid={'transparent'} multiline={true} autoFocus={false} onChangeText={(e)=>this.onChanegeTextKeyword(e)}
            style={{marginLeft:5,fontSize:13, color: '#f5f5f5',overflow:'hidden',width:'98%',height:'100%',padding:0}} placeholder="请输入两票名称"/>
        </View>
        </View>
            <ScrollView style={{marginTop:8}}>
         {  dataLis.length>0&&dataLis.map((itemdata,index)=>{
             return (<View style={{width:'100%',alignItems:'center'}} key={index}>
              <TouchableOpacity key={index} activeOpacity={.8}
                    onPress={()=>this.gotoItem(itemdata)}
                    style={{marginBottom:8,width:"95.3%",backgroundColor:'white',flexDirection:'row'}}>
                <View style={{width:'25%',alignItems:'center'}}>
                <View style={{marginTop:13,width:51,height:52,borderRadius:25.5,justifyContent:'center',alignItems:'center',borderColor:"#ccc",borderWidth:1,borderStyle:'solid'}}>
                <Image source={require('../images/await.png')} style={{width:30,height:30}}/>
                </View>
                <Text style={{color:"#333",fontSize:14,flexWrap:'wrap',width:60,marginTop:6.8,marginLeft:1.5,textAlign:'center'}}>{itemdata.tickettypename}</Text>
                </View>
                <View style={{width:'75%'}}>
                <View style={{width:'100%',flexDirection:'row',alignItems:'center',marginTop:8.7}}>
                <Text style={{flex:1,color:"#ff6600",fontSize:13.5}}>已等待{this.awaitTime(itemdata.lastTime)}</Text>
                <Text style={{color:"#1296db",fontSize:13.5,marginRight:14.5}}>{itemdata.ticketserialnum}</Text>
                </View>
                <Text numberOfLines={3} ellipsizeMode='middle' style={{lineHeight:23,color:"#333",fontSize:15.9,width:'99%',marginTop:4.2,marginLeft:1}}>
                   {itemdata.content==""?'暂无内容':itemdata.content}
                </Text>
                <View style={{flexDirection:'row',marginTop:7.4,alignItems:'center',marginLeft:2.3}}>
                <Text style={{paddingLeft:.8,paddingRight:1,paddingTop:2,textAlign:'center',color:'#1296db',borderWidth:1,borderRadius:5,borderColor:'#1296db',borderStyle:"solid",marginRight:5,fontSize:12}}>负责</Text>
                <Text style={{fontSize:14,color:"#333"}}>{itemdata.headuser==null?'暂无负责人':itemdata.headuser}</Text>
                <Text style={{paddingLeft:.8,paddingRight:1,paddingTop:2,marginLeft:15.5,textAlign:'center',borderWidth:1,borderRadius:5,borderColor:'#1296db',borderStyle:"solid",color:'#1296db',marginRight:5,fontSize:12}}>流转</Text>
                <Text style={{fontSize:14,color:"#333"}}>{itemdata.manageuser==null?'暂无流转人':itemdata.manageuser}</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',marginTop:3.7,marginBottom:6}}>
                  <Image source={require('../images/times.png')} style={{width:20,height:20,resizeMode:Image.resizeMode.contain,marginLeft:.7}}/>
                  <Text style={{color:"#333",marginLeft:4.3,fontSize:14}}>
                       {itemdata.lastTime.replace(/T/,' ')}
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
    )
  }
}