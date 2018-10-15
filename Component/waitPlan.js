import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity ,ScrollView,Button} from 'react-native';
import Title from './Title'
import HttpUtils from './../api/Httpdata'
export default class WaitPlan extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      animating: false,
      datas:{
        TicketTypeName:'水力自控工作票',
        HeadUser:'央研究院11',
        TicketSerialNum:'1',
        lastUser:'超级管理员',
        content:'222222222',
        ManageTime:'2018-09-27T15:06:01',
        lastTime:'2018-09-27T15:06:01'
      },
      result:''
    };
  }
    componentWillMount(){
    this.submitgo('http://59.172.204.182:8030/ttms/ticketMng/ticketMng_searchUnhandle.action','techlab')
}
    getDate(item){
        console.log("获取数据")
   
    }
    submitgo(url,data){
        url = url +"?form.userId="+data;
        HttpUtils.post(url,data)
        .then(async result=>{
            this.setState({
                result:JSON.stringify(result.form),//序列化：转换为一个 (字符串)JSON字符串
            });
            console.log(result.form,'qqqqqqqqqq')
        })
        .catch(error=> {
            this.setState({
                result: JSON.stringify(error),//把错误信息格式化为字符串
            })
        })
        // if(data.username!=form.user){
        //     alert(form.targetresult)
        // }
     }
    gotoItem(ID){
        //跳转时传递参数 typeName：票名称 ticketNum:编号  templateID：工作票模板id（TicketTemplateID） isAlter 常量1   _： 当前时间戳
        this.props.navigation.navigate('litile',{typeName:"水力自控工作票",ticketNum:"3",templateID:"b055c529482c4e1abdc5afcf4a61712f",isAlter:1,_:"1539334941569"})
    }
  render() {
    const { navigate } = this.props.navigation;
    const itemdata = this.state.datas;
    const listPage = this.state.result;
    if (listPage) {
        console.log(listPage)
    } else {
        console.log(2222222)
    }
    return (
      <View>
        <Title navigation={this.props.navigation} centerText={'待处理流程'} />
        {/* 需要循环获取数据 */}
        <ScrollView style={{marginBottom:50}}>
        {/* <TouchableOpacity> */}
            <View style={{backgroundColor:"#ffffff",marginTop:10}}>
                <View style={{marginTop:5,paddingBottom:10,paddingTop:10,color:"#000000",width:"90%",marginLeft:20}}>
                    <Text style={{color:"#000000"}}>两票类型：{itemdata.TicketTypeName}</Text>
                    <Text style={{color:"#000000"}}>负责人：{itemdata.HeadUser}</Text>
                    <Text style={{color:"#000000"}}>编号：{itemdata.TicketSerialNum}</Text>
                    <Text style={{color:"#000000"}}>流转人：{itemdata.lastUser}</Text>
                    <View><Text style={{color:"#000000"}}>内容：</Text></View>
                    <Text numberOfLines={10} style = {{paddingBottom:15,borderColor:"#eeeeee",borderWidth:1,borderStyle:"solid",color:"#000000"}}>{itemdata.content}</Text>
                    <Text style={{color:"#000000"}}>等待时间：{itemdata.ManageTime}</Text>
                    <Text style={{color:"#000000"}}>流转时间：{itemdata.lastTime}</Text>
                    <Button
                        onPress={()=>navigate('litile',{TicketSerialNum:itemdata.TicketSerialNum})}
                        title="查看详情"
                        color="#406ea4"
                        />
                </View>
            </View>
            
        {/* </TouchableOpacity> */}
        </ScrollView>
      </View>
    );
  }
}