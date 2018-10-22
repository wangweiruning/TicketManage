import React from 'react';
import Title from './Title';
import {InputItem,DatePicker,List,Checkbox} from 'antd-mobile-rn';
import {View,Text,ScrollView,TouchableOpacity} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import HttpUtils from '../api/Httpdata';
import {TicketBasicInfo,searchTicketBasicInfo,searchTicketFlow,searchFlowRecord,searchTicketRecord} from './../api/api'
import DropdownCheckbox from './DropdownCheckbox';
      
export default class Tdetail extends React.Component{
    constructor(props){
        super(props)
        this.state={
            na:[
                {
                    name:'saffa'
                },
                {
                    name:'saffa'
                },
                {
                    name:'saffa'
                },
                {
                    name:'saffa'
                },
            ],
            checkBox1: true,
            agreeItem1: true,
            checkboxItem1: true,
            username:'',
            part1Value: 1,
            part2Value: 1,
            value: null,
            templateContents:[],//获取模板列表
            dataList:[],//两票基本信息
            LcdataList:[],//当前类型两票流程
        }
    }

      async componentDidMount(){
        this.getCanNotdata()
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

        if(searchs.form.dataList.length>0){//数据库中已有记录
            statusId = searchs.form.dataList[0].TicketStatusID;//该流程的当前状态id
            var basicInfoId = searchs.form.dataList[0].TicketBasicInfoID;//TicketBasicInfoID第一条数据的信息id 
            
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



        }else { //新建两票，数据库中无记录
					statusId = ticketFlowrole[0].ticketstatusid;
					ticketFlowList.push(ticketFlowrole[0]);
        }
    }
      sub(url,{}){
        HttpUtils.post({}).then({}).catch({})
      }

      onChange = (value) => {
        console.log(value);
        this.setState({ value });
      }

    handleInput(k, v){
        this.setState({
            [k]: v
        });
        alert(v)
    }
    render(){
        const statedate = this.props.navigation;
        console.log(this.state.templateContents,this.state.dataList,this.state.LcdataList)
        return(<View style={{justifyContent:'center'}}>
            <Title navigation={this.props.navigation} centerText={this.props.navigation.state.params.typeName}/>
        <ScrollView style={{display:'flex'}}>
            <View style={{backgroundColor:'white',marginTop:5}}>
              <View style={{
                  width:'100%',
                  height:30,
                  backgroundColor:'white',
                  borderBottomWidth:1,
                  borderBottomColor:'black',
                  borderStyle:'solid',
                  justifyContent:'center',
                  }}>
                  <Text style={{color:'#3e5ed2',left:5}}>基本信息</Text>
              </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Text style={{left:5}}>单位</Text>
                <InputItem onChange={(v)=>this.handleInput('username',v)} style={{borderRadius:5,backgroundColor:'white',width:'85%'}}/>
            </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Text style={{left:5}}>编号</Text>
                <InputItem onChange={(v)=>this.handleInput('username',v)} style={{borderRadius:5,backgroundColor:'white',width:'85%'}}/>
            </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Text style={{left:5}}>工作负责人</Text>
                <ModalDropdown dropdownStyle={{width:'50%'}} textStyle={{color:'black'}} style={{left:10,backgroundColor:'skyblue',borderRadius:5,width:'50%'}} defaultValue={'请选择'} options={['同意', '拒绝']}/>
            </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Text style={{left:5}}>班组</Text>
                <InputItem onChange={(v)=>this.handleInput('username',v)} style={{borderRadius:5,backgroundColor:'white',width:'85%'}}/>
            </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Text style={{left:5}}>工作班成员</Text>
                <DropdownCheckbox datas={this.state.na}/>
            </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Text style={{left:5}}>工作发电厂名称</Text>
                <InputItem onChange={(v)=>this.handleInput('username',v)} style={{borderRadius:5,backgroundColor:'white',width:'85%'}}/>
            </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Text style={{left:5}}>设备名称</Text>
                <InputItem onChange={(v)=>this.handleInput('username',v)} style={{borderRadius:5,backgroundColor:'white',width:'85%'}}/>
            </View>
            </View>
            <View style={{backgroundColor:'white',marginTop:5}}>
              <View style={{
                  width:'100%',
                  height:30,
                  backgroundColor:'white',
                  borderBottomWidth:1,
                  borderBottomColor:'black',
                  borderStyle:'solid',
                  justifyContent:'center',
                  }}>
                  <Text style={{color:'#3e5ed2',left:5}}>工作任务</Text>
              </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Text style={{left:5}}>工作地点</Text>
                <InputItem onChange={(v)=>this.handleInput('username',v)} style={{borderRadius:5,backgroundColor:'white',width:'85%'}}/>
            </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Text style={{left:5}}>工作设备</Text>
                <InputItem onChange={(v)=>this.handleInput('username',v)} style={{borderRadius:5,backgroundColor:'white',width:'85%'}}/>
            </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Text style={{left:5}}>工作内容</Text>
                <InputItem onChange={(v)=>this.handleInput('username',v)} style={{borderRadius:5,backgroundColor:'white',width:'85%'}}/>
            </View>
            </View>
            <View style={{backgroundColor:'white',marginTop:5}}>
              <View style={{
                  width:'100%',
                  height:30,
                  backgroundColor:'white',
                  borderBottomWidth:1,
                  borderBottomColor:'black',
                  borderStyle:'solid',
                  justifyContent:'center',
                  }}>
                  <Text style={{color:'#3e5ed2',left:5}}>注意事项</Text>
              </View>
            <View style={{}}>
                <Text style={{left:5}}>安全措施（必要时可附页绘图说明）</Text>
                <InputItem onChange={(v)=>this.handleInput('username',v)} style={{borderRadius:5,backgroundColor:'white',width:'85%'}}/>
                <View style={{display:'flex',flexDirection:'row',margin:10}}>
                 <Checkbox/>
                 <Text style={{left:10}}>是否已执行</Text>
                </View>
            </View>
            <View style={{}}>
                <Text style={{left:5}}>工作地点保留带电部分或注意事项（由工作票签发人填写）</Text>
                <InputItem onChange={(v)=>this.handleInput('username',v)} style={{borderRadius:5,backgroundColor:'white',width:'85%'}}/>
            </View>
            <View style={{}}>
                <Text style={{left:5}}>补充工作地点保留带电部分或安全措施（由工作许可人填写）</Text>
                <InputItem onChange={(v)=>this.handleInput('username',v)} style={{borderRadius:5,backgroundColor:'white',width:'85%'}}/>
            </View>
            </View>
            <View style={{backgroundColor:'white',marginTop:5}}>
              <View style={{
                  width:'100%',
                  height:30,
                  backgroundColor:'white',
                  borderBottomWidth:1,
                  borderBottomColor:'black',
                  borderStyle:'solid',
                  justifyContent:'center',
                  }}>
                  <Text style={{color:'#3e5ed2',left:5}}>确认工作内容</Text>
              </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Text style={{left:5}}>许可开始工作时间</Text>
                <View style={{left:5,width:260}}><DatePicker
                value={this.state.value}
                mode="date"
                minDate={new Date(1999, 7, 6)}
                maxDate={new Date(2000, 11, 3)}
                onChange={this.onChange}
                format="YYYY-MM-DD"
                >
                <List.Item arrow="horizontal"></List.Item>
                </DatePicker></View>
            </View>
            </View>
            <View style={{backgroundColor:'white',marginTop:5}}>
              <View style={{
                  width:'100%',
                  height:30,
                  backgroundColor:'white',
                  borderBottomWidth:1,
                  borderBottomColor:'black',
                  borderStyle:'solid',
                  justifyContent:'center',
                  }}>
                  <Text style={{color:'#3e5ed2',left:5}}>人员变动</Text>
              </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Text style={{left:5}}>原工作负责人</Text>
                <ModalDropdown dropdownStyle={{width:'50%'}} textStyle={{color:'black'}} style={{left:10,backgroundColor:'skyblue',borderRadius:5,width:'50%'}} defaultValue={'请选择'} options={['同意', '拒绝']}/>
            </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Text style={{left:5}}>变更后工作负责人</Text>
                <ModalDropdown dropdownStyle={{width:'50%'}} textStyle={{color:'black'}} style={{left:10,backgroundColor:'skyblue',borderRadius:5,width:'50%'}} defaultValue={'请选择'} options={['同意', '拒绝']}/>
            </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Text style={{left:5}}>工作人员变动情况</Text>
                <InputItem onChange={(v)=>this.handleInput('username',v)} style={{borderRadius:5,backgroundColor:'white',width:'85%'}}/>
            </View>
            </View>
            <View style={{backgroundColor:'white',marginTop:5}}>
              <View style={{
                  width:'100%',
                  height:30,
                  backgroundColor:'white',
                  borderBottomWidth:1,
                  borderBottomColor:'black',
                  borderStyle:'solid',
                  justifyContent:'center',
                  }}>
                  <Text style={{color:'#3e5ed2',left:5}}>工作票延期</Text>
              </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Text style={{left:5}}>有效期延长到</Text>
                <View style={{left:5,width:290}}><DatePicker
                value={this.state.value}
                mode="date"
                minDate={new Date(1999, 7, 6)}
                maxDate={new Date(2000, 11, 3)}
                onChange={this.onChange}
                format="YYYY-MM-DD"
                >
                <List.Item arrow="horizontal"></List.Item>
                </DatePicker></View>
            </View>
            </View>
            <View style={{backgroundColor:'white',marginTop:5}}>
              <View style={{
                  width:'100%',
                  height:30,
                  backgroundColor:'white',
                  borderBottomWidth:1,
                  borderBottomColor:'black',
                  borderStyle:'solid',
                  justifyContent:'center',
                  }}>
                  <Text style={{color:'#3e5ed2',left:5}}>每日开工和收工时间（使用一天的工作票不必填写）</Text>
              </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Text style={{left:5}}>开工时间</Text>
                <View style={{left:5,width:310}}><DatePicker
                value={this.state.value}
                mode="date"
                minDate={new Date(1999, 7, 6)}
                maxDate={new Date(2000, 11, 3)}
                onChange={this.onChange}
                format="YYYY-MM-DD"
                >
                <List.Item arrow="horizontal"></List.Item>
                </DatePicker></View>
            </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Text style={{left:5}}>收工时间</Text>
                <View style={{left:5,width:310}}><DatePicker
                value={this.state.value}
                mode="date"
                minDate={new Date(1999, 7, 6)}
                maxDate={new Date(2000, 11, 3)}
                onChange={this.onChange}
                format="YYYY-MM-DD"
                >
                <List.Item arrow="horizontal"></List.Item>
                </DatePicker></View>
            </View>
            </View>
            <View style={{backgroundColor:'white',marginTop:5}}>
              <View style={{
                  width:'100%',
                  height:30,
                  backgroundColor:'white',
                  borderBottomWidth:1,
                  borderBottomColor:'black',
                  borderStyle:'solid',
                  justifyContent:'center',
                  }}>
                  <Text style={{color:'#3e5ed2',left:5}}>工作终结</Text>
              </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Text style={{left:5}}>工作结束时间</Text>
                <View style={{left:5,width:290}}><DatePicker
                value={this.state.value}
                mode="date"
                minDate={new Date(2015, 7, 6)}
                maxDate={new Date(2026, 11, 3)}
                onChange={this.onChange}
                format="YYYY-MM-DD"
                >
                <List.Item arrow="horizontal"></List.Item>
                </DatePicker>
                </View>
            </View>
            </View>
            <View style={{backgroundColor:'white',marginTop:5}}>
              <View style={{
                  width:'100%',
                  height:30,
                  backgroundColor:'white',
                  borderBottomWidth:1,
                  borderBottomColor:'black',
                  borderStyle:'solid',
                  justifyContent:'center',
                  }}>
                  <Text style={{color:'#3e5ed2',left:5}}>备注</Text>
              </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Text style={{left:5}}>制定专责监护人</Text>
                <ModalDropdown dropdownStyle={{width:'50%'}} textStyle={{color:'black'}} style={{left:10,backgroundColor:'skyblue',borderRadius:5,width:'50%'}} defaultValue={'请选择'} options={['同意', '拒绝']}/>
            </View>
            <View>
            <Text style={{left:5}}>地点及具体工作</Text>
            <InputItem onChange={(v)=>this.handleInput('username',v)} style={{borderRadius:5,backgroundColor:'white',width:'85%'}}/>
            </View>
            <View>
            <Text style={{left:5}}>其他事项</Text>
            <InputItem onChange={(v)=>this.handleInput('username',v)} style={{borderRadius:5,backgroundColor:'white',width:'85%'}}/>
            </View>
            </View>
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
            <View style={{display:'flex',flexDirection:'row',alignItems:'center',margin:5}}>
                <Text>是否同意</Text>
                <ModalDropdown dropdownStyle={{width:'50%'}} textStyle={{color:'black'}} style={{left:10,backgroundColor:'skyblue',borderRadius:5,width:'50%'}} defaultValue={'请选择'} options={['同意', '拒绝']}/>
            </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center',margin:5}}>
                <Text>流转状态</Text>
                <ModalDropdown dropdownStyle={{width:'50%'}} textStyle={{color:'black'}} style={{left:10,backgroundColor:'skyblue',borderRadius:5,width:'50%'}} defaultValue={'请选择'} options={['option 1', 'option 2']}/>
            </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center',margin:5}}>
                <Text>流转目标</Text>
                <ModalDropdown dropdownStyle={{width:'50%'}} textStyle={{color:'black'}} style={{left:10,backgroundColor:'skyblue',borderRadius:5,width:'50%'}} defaultValue={'请选择'} options={['option 1', 'option 2']}/>
            </View>
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