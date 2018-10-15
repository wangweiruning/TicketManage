import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity ,ScrollView,Button} from 'react-native';
import Title from './Title'
import HttpUtils from './../api/Httpdata'
export default class WaitPlan extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      animating: false,
      result:[{
        tickettypename:'水力自控工作票',
        headuser:'央研究院11',
        ticketserialnum:'1',
        manageuser:'超级管理员',
        content:'222222222',
        managetime:'2018-09-27T15:06:01',
        lastTime:'2018-09-27T15:06:01'
      }]
    };
  }
  componentDidMount(){
    this.submitgo('http://59.172.204.182:8030/ttms/ticketMng/ticketMng_searchUnhandle.action','techlab')
    this.showpage()
}
    getDate(item){
        console.log("获取数据")
   
    }
    submitgo(url,data){
        url = url +"?form.userId="+data;
        HttpUtils.post(url,data)
        .then(async result=>{
            this.setState({
                result:result.form.dataList,//序列化：转换为一个 (字符串)JSON字符串
            });
            console.log(result.form.dataList)
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

     showpage(){
        let itemdatas = this.state.result;
        const { navigate } = this.props.navigation;
        console.log(itemdatas)
        return  itemdatas.map((itemdata)=>{
            console.log(itemdata)
            return <View 
                        onPress={()=>this.gotoItem(itemdata)}
                        style={{marginTop:5,paddingBottom:10,paddingTop:10,color:"#000000",width:"90%",marginLeft:20}}>
                    <Text style={{color:"#000000"}}>两票类型：{itemdata.tickettypename}</Text>
                    <Text style={{color:"#000000"}}>负责人：{itemdata.headuser}</Text>
                    <Text style={{color:"#000000"}}>编号：{itemdata.ticketserialnum}</Text>
                    <Text style={{color:"#000000"}}>流转人：{itemdata.manageuser}</Text>
                    <View><Text style={{color:"#000000"}}>内容：</Text></View>
                    <Text numberOfLines={10} style = {{paddingBottom:15,borderColor:"#eeeeee",borderWidth:1,borderStyle:"solid",color:"#000000"}}>{itemdata.content}</Text>
                    <Text style={{color:"#000000"}}>等待时间：{itemdata.manageTime}</Text>
                    <Text style={{color:"#000000"}}>流转时间：{itemdata.lastTime}</Text>
                    <Button
                        onPress={()=>navigate('litile',{ticketserialnum:itemdata.ticketserialnum})}
                        title="查看详情"
                        color="#406ea4"
                        />
                </View>
        })
     }


    gotoItem(params){
        //跳转时传递参数 typeName：票名称 ticketNum:编号  templateID：工作票模板id（TicketTemplateID） isAlter 常量1   _： 当前时间戳
        this.props.navigation.navigate('litile',{
                                                typeName:params.tickettypename,
                                                ticketNum:params.ticketserialnum,
                                                templateID:params.tickettemplateid,
                                                isAlter:1,
                                                _:Date.parse(new Date())})
    }
  render() {

    return (
      <View>
        <Title navigation={this.props.navigation} centerText={'待处理流程'} />
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