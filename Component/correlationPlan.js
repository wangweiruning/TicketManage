import React from 'react';
import {Text,View,TouchableOpacity,ScrollView,Image,Alert,TextInput} from 'react-native';
import Title from './Title'
import HttpUtils from '../api/Httpdata3';
import {correation,historys} from './../api/api'
import MySorage from '../api/storage';
import {ActivityIndicator } from 'antd-mobile-rn';
export default class CorrelationPlan extends React.Component{
  constructor(props) {
    MySorage._getStorage()
    super(props);
    this.state = {
        http:jconfig.netWorkIp?jconfig.netWorkIp:'http://59.172.204.182:8030/ttms',
        animating: false,
        result:[],
        SelectData:[],
        userId:"",
        havenotdate:false,
        mengCard:true
        };
      }
    async componentWillMount(){
      const {navigate} = this.props.navigation;
    //   if(jconfig.userinfo.user==(""||null)){
    //   return Alert.alert(
    //     "登录超时",
    //     "登录状态已过期，请重新登录",
    //     [
    //       {text: '去登陆', onPress: () => navigate('login')},
    //     ],
    //     {cancelable:false}
    //   );
    // }
    if(!jconfig.userinfo.status){
       return Alert.alert(
        "登录验证",
        "你还没有登录哦，请先登录再来吧",
        [
          {text: '去登陆', onPress: () => navigate('login')},
        ],
        {cancelable:false}
      );
    }else{
        const histo = await HttpUtils.AjaxData(`${this.state.http}/ticketMng/ticketMng_loadGrid.action`,"?form.tree_node_operation="+0) //historys("?form.tree_node_operation="+0);
        const datas = "?form.userId="+histo.form.userId+"&pageSize=10&curPage=0";
        const result = await HttpUtils.AjaxData(`${this.state.http}/ticketMng/ticketMng_searchOnline.action`,datas) //correation(datas);
        this.setState({
            userId:histo.form.userId,
            result:result.form.dataList.sort((a,b)=>{
              return  a.lastTime>b.lastTime?-1:1
            }),
            SelectData:result.form.dataList,//序列化：转换为一个 (字符串)JSON字符串
            mengCard:false
        });
                     
        if(!result.form.dataList.length>0){
        this.setState({
          havenotdate:true
      })
      }
      }
     }
    gotoItem(params){
        //跳转时传递参数 typeName：票名称 ticketNum:编号  templateID：工作票模板id（TicketTemplateID） isAlter 常量1   _： 当前时间戳
        this.props.navigation.navigate('Result',{
            typeName:params.tickettypename,
            ticketNum:params.ticketserialnum,
            templateID:params.tickettemplateid,
            isAlter:1,
            isqianfa:false,
            departmentid:params.departmentid,
            ticketbasicinfoid:params.ticketbasicinfoid,
            userId:this.state.userId,
            canot:true,
            ishistory:true
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

  testBlur(){
    this.refs.inputWR.blur();
  }

  render() {
   let result = this.state.result;
    return (<View style={{width: '100%', height: '100%'}}>
        <Title navigation={this.props.navigation} centerText={'相关流程'} />
        {/* 需要循环获取数据 */}
            <View style={{flex:1}}>
            {this.state.mengCard&&<View style={{justifyContent:'center',alignItems:'center',zIndex:444,width:"100%",height:"100%"}}>
            <ActivityIndicator color="#363434"/>
            <Text style={{color:"#363434",textAlign:"center",marginTop:10,fontSize:15}}>加载中...</Text>
            </View>}
            <View style={{width:'100%',justifyContent:"center",alignItems:'center',backgroundColor:'white',height:60}}>
            <View style={{backgroundColor:'#eee',width:'97%',flexDirection:'row',borderRadius:15,alignItems:'center',height:40}}> 
            <Image source={require('../images/search.png')} style={{width:20,height:20,marginLeft:8}}/>
              <TextInput onSubmitEditing={()=>{this.testBlur()}} ref="inputWR" underlineColorAndroid={'transparent'} multiline={true} autoFocus={false} onChangeText={(e)=>this.onChanegeTextKeyword(e)}
                style={{fontSize:13, color: '#363434',overflow:'hidden',width:'98%'}}
                placeholder={"请输入两票名称"}
            />
            </View>
            </View>
            <ScrollView style={{marginTop:8}}>
              {result.length>0&&result.map((itemdata,index)=>{
                 return (<View style={{width:'100%',alignItems:'center'}} key={index}>
                  <TouchableOpacity key={index} activeOpacity={.8}
                        onPress={()=>this.gotoItem(itemdata)}
                        style={{marginBottom:8,width:"95.3%",backgroundColor:'white',flexDirection:'row'}}>
                    <View style={{width:'25%',alignItems:'center'}}>
                    <View style={{marginTop:13,width:51,height:52,borderRadius:25.5,justifyContent:'center',alignItems:'center',borderColor:"#ccc",borderWidth:1,borderStyle:'solid'}}>
                    <Image source={require('../images/colle.png')} style={{width:30,height:30}}/>
                    </View>
                    <Text style={{color:"#333",fontSize:14,flexWrap:'wrap',width:60,marginTop:6.8,marginLeft:1.5,textAlign:'center'}}>{itemdata.tickettypename}</Text>
                    </View>
                    <View style={{width:'75%'}}>
                    <Text style={{color:"#1296db",fontSize:13.5,marginTop:8.7}}>{itemdata.ticketserialnum}</Text>
                    <Text numberOfLines={3} ellipsizeMode='middle' style={{lineHeight:23,color:"#333",fontSize:15.9,width:'99%',marginTop:4.2}}>
                      {itemdata.content==""?'暂无内容':itemdata.content}
                    </Text>
                    <View style={{flexDirection:'row',marginTop:7.4,alignItems:'center'}}>
                    <Text style={{paddingLeft:.8,paddingRight:1,textAlign:'center',borderWidth:1,borderRadius:5,borderColor:'#1296db',borderStyle:"solid",color:'#1296db',marginRight:5,fontSize:12}}>负责</Text>
                    <Text style={{fontSize:14,color:"#333"}}>{itemdata.headuser==null?'暂无负责人':itemdata.headuser}</Text>
                    <Text style={{paddingLeft:.8,paddingRight:1,marginLeft:15.5,textAlign:'center',borderWidth:1,borderRadius:5,borderColor:'#1296db',borderStyle:"solid",color:'#1296db',marginRight:5,fontSize:12}}>流转</Text>
                    <Text style={{fontSize:14,color:"#333"}}>{itemdata.manageuser==null?'暂无流转人':itemdata.manageuser}</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',marginTop:3.7,marginBottom:6}}>
                      <Image source={require('../images/times.png')} style={{width:20,height:20,resizeMode:Image.resizeMode.contain}}/>
                      <Text style={{color:"#333",marginLeft:4.3,fontSize:14}}>
                          {itemdata.managetime.replace(/T/,' ')}
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