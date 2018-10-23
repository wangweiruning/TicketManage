import React from 'react';
import Title from './Title';
import {InputItem,DatePicker,List,Checkbox,TextareaItem} from 'antd-mobile-rn';
import {View,Text,ScrollView,TouchableOpacity,Picker,} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import HttpUtils from '../api/Httpdata';
import {TicketBasicInfo,
        searchTicketBasicInfo,
        searchTicketFlow,
        searchFlowRecord,
        searchTicketRecord,
        newTiceketNum,
        searchUserForRole,
        editquanxian
    } from './../api/api'
      
export default class Tdetail extends React.Component{
    constructor(props){
        super(props)
        this.state={
            part1Value:false,
            TiceketNum:"",
            username:'',
            value: null,
            templateContents:[],//获取模板列表
            dataList:[],//两票基本信息
            LcdataList:[],//当前类型两票流程
            searchRole:[],//提交对象
            havChangeList:[],//获取可编辑模块
            nextFlowId:"",//下一个流转id
            nextFlow:"",//下一个流转流程
            aggree:1,//是否同意提交
            havelist:[],
            ContentID:"",
            rolecontentid:""

        }
    }

      async componentWillMount(){
        this.getCanNotdata()
      }

      componentDidMount(){
          
      }

    //获取模板列表
    async getCanNotdata(){
        if(!jconfig.userinfo) return ToastAndroid.show('请登录',ToastAndroid.SHORT);
        var ticketFlowrole = [];//定义该流程所属类型的所有状态角色
        var statusId = "";//定义该流程的状态id
        var roleId = "";//定义登陆用户的角色id
        var ticketFlowList = [];//定义当前流程所有状态
        var index = "";//定义当前状态在所有状态的下标
        var skipFlowId = "";	//获取当前流程能跳转的流程id，0为不能跳转
        var isBack = "";	//获取当前流程是否能回转，1为能回转，0为不能回转
        const {templateID,ticketNum,typeName}= this.props.navigation.state.params; 

        
        /**
         * 获取票编号
         * newTiceketNum
         * **/
        const ids = '?form.templateId='+templateID;
        const TiceketNum = await newTiceketNum(ids);
        console.log(TiceketNum,"获取两票模板票id")
        this.setState({
            TiceketNum:TiceketNum.form.newTicket
        })


        let r = '?form.jqgrid_row_selected_id='+templateID;
          let x = await TicketBasicInfo(r);//获取模板
          console.log(x,'获取模板')
          if(x.form.templateContents.length>0){
                this.setState({
                    templateContents: x.form.templateContents
                })
          }
        //查询当前两票基本信息  
        console.log(ticketNum)
        let aas = '?form.ticketNum='+ticketNum;
        let searchs =  await searchTicketBasicInfo(aas);
        console.log(searchs,"查询当前两票基本信息 ")
        //设置流转状态及目标用户，展示流程记录

        //当前类型两票流程
        //根据类型名称查询流程状态角色并排序显示
        let data = '?form.ticketTypeName='+typeName;
        let liucheng = await searchTicketFlow(data);
        console.log(liucheng,"当前类型两票流程 ")
            if(liucheng.form.dataList.length>0){
                this.setState({
                    LcdataList:liucheng.form.dataList
                })
            }

        ticketFlowrole = liucheng.form.dataList;//该流程所属类型的所有状态角色
            console.log(ticketFlowrole,"6666666666666666666666")
        if(searchs.form.dataList.length>0){//数据库中已有记录
            console.log("数据库中已有记录")
            statusId = searchs.form.dataList[0].TicketStatusID;//该流程的当前状态id
            var basicInfoId = searchs.form.dataList[0].TicketBasicInfoID;//TicketBasicInfoID第一条数据的信息id 
            console.log(statusId,basicInfoId)
            this.setState({
                dataList:searchs.form.dataList
            })

            // 这里需要获取已经经过的流程
            const flewFrom = "?form.basicInfoId="+basicInfoId;
            const FlowList = await searchFlowRecord(flewFrom)
            console.log(FlowList,"这里需要获取已经经过的流程 ")
            ticketFlowList = FlowList.form.dataList;//获取当前流程所有状态
            //将已填写的参数值填入页面
            const TicketRecord =await searchTicketRecord(flewFrom);
            console.log(TicketRecord,"将已填写的参数值填入页面 ")
            const list = TicketRecord.form.dataList;//获取到票数据内容，等待传入页面
             //设置提交目标
             for (var i = 0; i < ticketFlowrole.length; i++) {
                if (ticketFlowrole[i].ticketstatusid == statusId) {
                    index = i;
                    break;
                }
            }
            console.log(index,"======================")
            if (index > ticketFlowrole.length - 3) { //最后两个状态为验收和作废，均为终结流程
                console.log("终结流程!")
        } else {
            //设置流转状态及流转目标
            var nextFlowId = ticketFlowrole[index + 1].ticketstatusid;//下一个流程id
            var nextFlow = ticketFlowrole[index + 1].ticketstatusname;//下一个流程状态
            this.setState({
                nextFlowId:nextFlowId,
                nextFlow:nextFlow
            })
            // $("#nextFlow").append('<option value="' + nextFlowId + '" selected>' + nextFlow + '</option>');
            var nextRoleId = ticketFlowrole[index + 1].ticketroleid;
            const dui="?form.roleId="+nextRoleId;
            const searchRole = await searchUserForRole(dui);//获取提交对象
            console.log(searchRole,"获取提交对象")
            this.setState({
                searchRole:searchRole.form.dataList
            })
        }

        skipFlowId = ticketFlowrole[index].skipflowid;
        isBack = ticketFlowrole[index].isback;
        if (skipFlowId == 0 && isBack == 0) {
            this.setState({
                aggree:1
            })
        } else {
            this.setState({
                aggree:2
            })
        }
        const paramsItem = "?form.flowroleid="+ticketFlowList[ticketFlowList.length - 1].FlowRoleID;
        const saves = await editquanxian(paramsItem);//获取可编辑内容区域
        console.log(saves.form.dataList,"获取可编辑内容区域");
            this.setState({
                havChangeList:saves.form.dataList
            })

        this.xunahn(x.form.templateContents,saves.form.dataList)
        }else { //新建两票，数据库中无记录
					statusId = ticketFlowrole[0].ticketstatusid;
					ticketFlowList.push(ticketFlowrole[0]);
        }
        
    }
      sub(url,{}){
        HttpUtils.post({}).then({}).catch({})
      }

      onChange = (value,v) => {
        console.log(value,v,"======");
        this.setState({ value });
      }

    handleInput(k, v){
        this.setState({
            [k]: v
        });
        // alert(v)
    }
    xunahn(sss,kkk){
        console.log(sss,kkk,"============")
        let s = sss;
        let g = kkk;
        let arrs=[];
        for(let i in s){
            for(let c in g){
                this.setState({
                     ContentID:g[c].TicketParaID,
                     rolecontentid:s[i].TicketParaID
                })
                if(this.state.ContentID===this.state.rolecontentid){
                    // arrs.push(this.state.ContentID)
                    console.log(this.state.ContentID,this.state.rolecontentid,'>>>>>><<<<<<<')
                }
            }
        }
    this.setState({
        havelist: arrs
    })
    }
    gotSubmit=()=>{
        console.log(this.state.searchRole,"--------------------")
        const list = [];
        if (this.state.searchRole.length>0) {
            this.state.searchRole.map((item,ks)=>{
                list.push(item.realname)
            })
            return <View style={{display:'flex',flexDirection:'row',alignItems:'center',margin:5}}>
                        <Text>流转目标</Text>
                        <ModalDropdown 
                            dropdownStyle={{width:'50%'}} 
                            textStyle={{color:'black'}} 
                            style={{left:10,backgroundColor:'skyblue',borderRadius:5,width:'50%'}} 
                            defaultValue={list[0]} 
                            options={list}/>
                    </View>
        } else {
            console.log("没有提交对象")
        }
       
    }
    getliuzhuan=()=>{
        let arr=[];
        if (this.state.nextFlow!="") {
            arr.push(this.state.nextFlow)
            return  <View style={{display:'flex',flexDirection:'row',alignItems:'center',margin:5}}>
                        <Text>流转状态</Text>
                        <ModalDropdown  dropdownStyle={{width:'50%',height:45}} 
                                        textStyle={{color:'black'}} 
                                        style={{left:10,backgroundColor:'skyblue',borderRadius:5,width:'50%'}} 
                                        defaultValue={arr[0]} 
                                        options={arr}/>
                    </View>
            } else {
              console.log("没有流转状态")          
        }
    }

    aggreeall=()=>{
        let arr=[];
        const aggress =this.state.aggree;
        if(aggress!=2){
            arr.push("同意")
        }else{
            arr.push("不同意")
        }
        return <View style={{display:'flex',flexDirection:'row',alignItems:'center',margin:5}}>
        <Text>是否同意</Text>
        <ModalDropdown 
        dropdownStyle={{width:'50%',height:45}} 
        textStyle={{color:'black'}} 
        style={{left:10,backgroundColor:'skyblue',borderRadius:5,width:'50%'}} 
        defaultValue={arr[0]} 
        options={arr}/>
    </View>
    }
    render(){
        const havelist = this.state.havelist;
        // v.TicketParaID===h.TicketParaID 待用数据
        const statedate = this.props.navigation;
        console.log(this.state.templateContents,this.state.dataList,this.state.LcdataList)
        const baise={
            borderRadius:5,
            backgroundColor:'white',
            width:'85%'
        } 
        const huise={
            borderRadius:5,
            backgroundColor:'#eee333',
            width:'85%'
        }
        return(<View style={{justifyContent:'center'}}>
                    <Title navigation={this.props.navigation} 
                        centerText={this.props.navigation.state.params.typeName+""+this.state.TiceketNum}/>
                    <ScrollView style={{display:'flex'}}>
                        {
                            this.state.templateContents.map((v,i)=>{
                            return <View  key={i} style={{backgroundColor:'white',marginTop:5}}>
                            <View style={{
                                width:'100%',
                                height:30,
                                flexDirection:'row',
                                backgroundColor:'white',
                                borderBottomWidth:1,
                                borderBottomColor:'black',
                                borderStyle:'solid',
                                alignItems:'center',
                                }}>
                                <Text style={{color:'#3e5ed2',left:5}}>{v.ParaName}</Text>
                            </View>
                            <View>
                            {   v.ParaTypeID==4?
                                <Picker style={{ height: 50, width: 100 }} 
                                        mode='dropdown' 
                                        enabled={this.state.ContentID===v.TicketParaID?true:false}>
                                    <Picker.Item label="Java" value="java" />
                                    <Picker.Item label="JavaScript" value="js" />
                                </Picker>
                                :v.ParaTypeID==3?<Picker style={{ height: 50, width: 100 }} 
                                mode='dropdown' 
                                enabled={this.state.ContentID===v.TicketParaID?true:false}>
                                <Picker.Item label="Java" value="java" />
                                <Picker.Item label="JavaScript" value="js" />
                                </Picker>
                                :v.ParaTypeID==2?
                                <InputItem  
                                value="" 
                                editable={this.state.ContentID==v.TicketParaID?true:false} 
                                onChange={(v)=>this.handleInput('username'+i,v)} 
                                style={this.state.ContentID==v.TicketParaID?baise:huise} />
                                         :v.ParaTypeID==5?<View style={{left:5,width:290}}>
                                <DatePicker
                                    value={this.state.value}
                                    mode="date"
                                    minDate={new Date(1999, 7, 6)}
                                    maxDate={new Date(2000, 11, 3)}
                                    onChange={this.onChange}
                                    format="YYYY-MM-DD"
                                    disabled={this.state.ContentID==v.TicketParaID?false:true}
                                >
                                    <List.Item arrow="horizontal"></List.Item>
                                    </DatePicker></View>
                                         :v.ParaTypeID==6?
                                <View><TextareaItem editable={this.state.ContentID==v.TicketParaID?true:false} placeholder="高度自适应" autoHeight style={{ paddingVertical: 5 }} />
                                {v.ParaName==='安全措施（必要时可附页绘图说明）'?<View style={{flexDirection:'row'}}><Checkbox /><Text>是否已执行</Text></View>:<Text></Text>}
                                </View>:<Text></Text>
                            }
                                    </View>
                                    </View>
                        })}
                            <View style={{backgroundColor:'white',marginTop:5,marginBottom:20}}>
                            <View style={{
                                width:'100%',
                                height:30,
                                backgroundColor:'white',
                                borderBottomWidth:1,
                                borderBottomColor:'black',
                                borderStyle:'solid',
                                justifyContent:'center',
                                }}>
                                <Text style={{color:'#3e5ed2',left:5}}>提交</Text>
                            </View>
                                {this.aggreeall()}
                                {this.getliuzhuan()}
                                {this.gotSubmit()}
                           
                            </View> 
                            <View style={{marginBottom:50,width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <TouchableOpacity 
                                            style={{
                                                justifyContent:'center',
                                                alignItems:'center',
                                                width:'60%',
                                                backgroundColor:'#3e5ed2',
                                                borderRadius:5,height:40}}>
                                        <Text style={{color:'white',fontSize:20}}>提交</Text>
                                </TouchableOpacity>
                            </View>
                  </ScrollView>
              </View>)
    }
}