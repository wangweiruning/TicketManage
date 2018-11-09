import React from 'react';
import {Text, View,ScrollView ,Alert,Button} from 'react-native';
import {historys,gethistory} from './../api/api'
import Title from './Title'
import PageListView from './PageListView'
export default class HistoryPlan extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        animating: false,
        result:'',
    };
  }

    componentWillMount(){
    const {navigate} = this.props.navigation
    if(!jconfig.userinfo.status) return Alert.alert(
        "登录验证",
        "你还没有登录哦，请先登录再来吧",
        [
          {text: '返回', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: '去登陆', onPress: () => navigate('login')},
        ],
      );
  }

  async gotoItem(params){

    const items ="?form.jqgrid_row_selected_id="+params.id
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
})
}
       // 20180730 刷新
 async _refresh(callBack){
  //    const datas = "?tree_node_operation=0&pageSize=10&curPage="+page;
        const datas = "?form.tree_node_operation="+0;
        const result = await historys(datas);
        console.log(result.form.page.dataRows,"获取历史流程")

        if(result&&result.form.page.dataRows.length>0){
        this.setState({
            result:result.form.page.dataRows,//序列化：转换为一个 (字符串)JSON字符串
        });
        }
  callBack(result.form.page.dataRows);
         if(result&&result.form.dataList.length>0){
        this.setState({
            result:this.state.result.concat(result.form.page.dataRows),//序列化：转换为一个 (字符串)JSON字符串
        });
       }
 
}
 
// 20180730 加载更多
async _loadMore(page,callBack){
  
  // const datas = "?tree_node_operation=0&pageSize=10&curPage="+page;
  const datas = "?form.tree_node_operation="+0;
        const result = await historys(datas);
        console.log(result.form.page.dataRows,"获取历史流程")
        callBack(result.form.page.dataRows);
        if(result&&result.form.page.dataRows.length>0){
        this.setState({
            result:result.form.page.dataRows,//序列化：转换为一个 (字符串)JSON字符串
        });
        }  
}
 
// 20180730 子组件渲染
_renderRow(itemdata) {
  // <CommentItem row={row} />
  return (<View 
            style={{marginTop:5,paddingBottom:10,paddingTop:10,width:"90%",marginLeft:20}}>
            <Text style={{color:"#000000"}}>两票类型：{itemdata.tickettypename}</Text>
            <Text style={{color:"#000000"}}>两票编号：{itemdata.ticketserialnum}</Text>
            <Text style={{color:"#000000"}}>工作负责人：{itemdata.realname}</Text>
            <View><Text style={{color:"#000000"}}>内容：</Text></View>
            <Text numberOfLines={10} style = {{paddingBottom:15,borderColor:"#eeeeee",borderWidth:1,borderStyle:"solid",color:"#000000"}}>{itemdata.content}</Text>
            <Text style={{color:"#000000"}}>开票时间：{itemdata.filltickettime}</Text>
            <Button
            onPress={()=>this.gotoItem(itemdata)}
            title="查看详情"
            color="#406ea4"
            />
          </View>)
}
  render() {
      let height = this.state.result.length * 100;
      return (
        <View style={{flex:1}}>
          <Title navigation={this.props.navigation} centerText={'历史流程'} />
          {/* 需要循环获取数据 */}
              <View style={{flex:1,backgroundColor:"#ffffff"}}>
              <PageListView
                  height={height}
                  pageLen={1}
                  renderRow={this._renderRow.bind(this)}
                  refresh={this._refresh.bind(this)}
                  loadMore={this._loadMore.bind(this)}
              />
              </View>
        </View>
    );
  }
}