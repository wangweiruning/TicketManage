import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Button,ScrollView } from 'react-native';
import {historys} from './../api/api'
import Title from './Title'
export default class HistoryPlan extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        animating: false,
        result:'',
    };
  }

  async  componentDidMount(){
    await  this.submitgo()
  }

  getDate(item){
        console.log("获取数据")
    }

  async  submitgo(){
    const {navigate} = this.props.navigation
    if(!jconfig.userinfo.status) return Alert.alert(
        "登录验证",
        "你还没有登录哦，请先登录再来吧",
        [
          {text: '返回', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: '去登陆', onPress: () => navigate('login')},
        ],
      );
        const datas = "?form.tree_node_operation="+0;
        const result = await historys(datas);
        console.log(result.form.page.dataRows,"获取历史流程")

        if(result&&result.form.page.dataRows.length>0){
        this.setState({
            result:result.form.page.dataRows,//序列化：转换为一个 (字符串)JSON字符串
        });
        }  
    }
  showpage(){
    let itemdatas = this.state.result;
    const { navigate } = this.props.navigation;
    console.log(itemdatas,"1211")
        if (itemdatas.length>0) {
            return  itemdatas.map((itemdata,i)=>{
                return <View 
                            key={i}
                            style={{marginTop:5,paddingBottom:10,paddingTop:10,width:"90%",marginLeft:20}}>
                            <Text style={{color:"#000000"}}>两票类型：{itemdata.tickettypename}</Text>
                            <Text style={{color:"#000000"}}>两票编号：{itemdata.ticketserialnum}</Text>
                            <Text style={{color:"#000000"}}>工作负责人：{itemdata.realname}</Text>
                            <View><Text style={{color:"#000000"}}>内容：</Text></View>
                            <Text numberOfLines={10} style = {{paddingBottom:15,borderColor:"#eeeeee",borderWidth:1,borderStyle:"solid",color:"#000000"}}>{itemdata.content}</Text>
                            <Text style={{color:"#000000"}}>开票时间：{itemdata.filltickettime}</Text>
                            {/* <Button
                                onPress={()=>this.gotoItem(itemdata)}
                                title="查看详情"
                                color="#406ea4"
                                /> */}
                    </View>
            })
        } else {
            return <View 
            onPress={()=>this.gotoItem(itemdata)}
            style={{marginTop:5,paddingBottom:10,paddingTop:10,width:"90%",marginLeft:20}}>
        <Text style={{color:"#000000",textAlign:"center",marginTop:10,marginBottom:10}}>暂时没有数据~~</Text>
    </View>
        }
     }
     gotoItem(params){
        //跳转时传递参数 typeName：票名称 ticketNum:编号  templateID：工作票模板id（TicketTemplateID） isAlter 常量1   _： 当前时间戳
        this.props.navigation.navigate('Result',{
            typeName:params.tickettypename,
            ticketNum:params.ticketserialnum,
            templateID:params.tickettemplateid,
            isAlter:1,
            departmentid:params.departmentid,
            userId:this.state.userId,
            _:Date.parse(new Date())})
    }
  render() {
    return (
      <View>
        <Title navigation={this.props.navigation} centerText={'历史流程'} />
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