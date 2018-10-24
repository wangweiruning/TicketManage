import React from 'react';
import Title from './Title';
import {InputItem,DatePicker,List,Checkbox,TextareaItem} from 'antd-mobile-rn';
import {View,Text,ScrollView,TouchableOpacity,Picker} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import DropdownCheckbox from '../Component/DropdownCheckbox';
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
            rolecontentid:"",
            userAll:[],
            showPage:{
                selected1:null,
                selected2:null,
                selected3:null,
                selected4:null,
                value0: null,
                value1: null,
                value2: null,
                value3: null,
                value4: null,
                isagree:null,//是否同意流转 0 同意 1 不同意
                isflew:"",//下一个流转状态
                isfleUser:"",
                danweiname:"",
                bianhao:"",
                classname:"",
                gongchang:"",
                poername:"",
                theway:"",
                shebei:''
            },
            userPower:''

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
            var nextRoleId = ticketFlowrole[index + 1].ticketroleid;
            const dui="?form.roleId="+nextRoleId;
            const searchRole = await searchUserForRole(dui);//获取提交对象
            console.log(searchRole,"获取提交对象")
            this.setState({
                searchRole:searchRole.form.dataList
            })
            let aa = [];
            let kobe = searchRole.form.dataList;
            for(let j in kobe){
                  let bryent = kobe[j].realname;
                  aa.push(bryent);
              }
              this.setState({
                userAll:aa
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
     format(time, format){
        var t = new Date(time);
        var tf = function(i){return (i < 10 ? '0' : '') + i};
        return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
            switch(a){
                case 'yyyy':
                return tf(t.getFullYear());
                break;
                case 'MM':
                return tf(t.getMonth() + 1);
                break;
                case 'mm':
                return tf(t.getMinutes());
                break;
                case 'dd':
                return tf(t.getDate());
                break;
                case 'HH':
                return tf(t.getHours());
                break;
                case 'ss':
                return tf(t.getSeconds());
                break;
            }
        })
}

      onChange(flag,value){
          if (flag==0) {
            this.state.showPage.value0=value;
          } else if(flag==1){
            this.state.showPage.value1=value;
          } else if(flag==2){
            this.state.showPage.value2=value;
          }else if(flag==3){
            this.state.showPage.value3=value;;
          }else if(flag==4){
            this.state.showPage.value4=value;
          }
          this.forceUpdate()
      }

    handleInput(k, v){
        this.setState({
            [k]: v
        });
    }

    xunahn(sss,kkk){
        let s = sss;
        let g = kkk;
        let arrs=[];
        for(let i in s){
            for(let c in g){
                if(this.state.ContentID===this.state.rolecontentid){
                    this.state.ContentID = g[c].TicketParaID,
                    this.state.rolecontentid = s[i].TicketParaID
                }
            }
        }
        this.forceUpdate()
    }

    ischacked=(asd)=>{
        let sss = this.state.havChangeList;
        let index = sss.findIndex((v)=>{
            return v.TicketParaID == asd;
        });
        return index==-1;

    }

    gotSubmit=()=>{
        const list = [];
        if (this.state.searchRole.length>0) {
            this.state.searchRole.map((item,ks)=>{
                list.push(item.realname)
            })
        return  <View style={{margin:5}}>
                        <Text>流转目标</Text>
                        <DropdownCheckbox SelectData={list} color="skyblue"/>
                </View>
        } else {
            console.log("没有提交对象")
        }
       
    }
    getliuzhuan=()=>{
        let arr=[];
        if (this.state.nextFlow!="") {
            arr.push(this.state.nextFlow)
            this.state.showPage.isflew=arr[0];
            return  <View style={{}}>
                        <Text style={{left:5}}>流转状态</Text>
                        <ModalDropdown  dropdownStyle={{width:'100%',height:45}} 
                                        textStyle={{color:'black',alignItems:'center',textAlign:'center',marginTop:7}} 
                                        style={{backgroundColor:'skyblue',borderRadius:5,height:30,width:'100%'}}
                                        defaultValue={arr[0]} 
                                        onSelect={(index,value)=>this.changeAgree(1,value)}
                                        options={arr}/>
                    </View>
            } else {
              console.log("没有流转状态")          
        }
    }
    changeAgree=(flag,value)=>{
        console.log(flag,value)
        if (flag==0) {
            this.state.showPage.isagree = value;
        } else {
            this.state.showPage.isflew = value;
        }
        this.forceUpdate();
    }
    aggreeall=()=>{
        let arr=[];
        const aggress =this.state.aggree;
        if(aggress!=2){
            arr.push("同意")
        }else{
            arr.push("不同意")
        }
        this.state.showPage.isagree=arr[0];
        return <View style={{height:50}}>
        <Text style={{left:5}}>是否同意</Text>
        <ModalDropdown 
        dropdownStyle={{width:'100%',height:45}} 
        textStyle={{color:'black',alignItems:'center',textAlign:'center',marginTop:7}} 
        style={{backgroundColor:'skyblue',borderRadius:5,height:30,width:'100%'}} 
        defaultValue={arr[0]} 
        onSelect={(index,value)=>this.changeAgree(0,value)}
        options={arr}/>
    </View>
    }

    onValueChange = (flag,value) => {
        if(flag ==1){
            this.state.showPage.selected1=value;
            }else if(flag==2){
                this.state.showPage.selected2=value;
            }else if(flag==3){
                this.state.showPage.selected3=value;
            }else if(flag==4){
                this.state.showPage.selected4=value;
            }
            this.forceUpdate()
      };

    submitResult(){
        const {showPage}= {...this.state};
        const {value0}={...showPage};

        // 转化时间格式
        console.log(this.format(value0,"yyyy-MM-dd"));
        console.log(this.state)
    }
    render(){
        const baise={
            borderRadius:5,
            backgroundColor:'white',
            borderBottomWidth:2,backgroundColor:"#fffeee",
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
                                let dis = this.ischacked(v.TicketParaID);
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
                                <DropdownCheckbox SelectData={this.state.userAll} canClick={dis}/>
                                :v.ParaTypeID==3?
                                <View>
                                { v.ParaName=="工作负责人" && <Picker 
                                selectedValue={this.state.showPage.selected1}
                                onValueChange={(value)=>this.onValueChange(1,value)}
                                style={{ height: 50, width: "100%" }} 
                                mode='dropdown' 
                                enabled={!dis}>
                                 {           
                                    this.state.searchRole.map((item,index)=>{
                                        return <Picker.Item label={item.realname} value={item.realname} key={index}/>
                                    })
                                }
                                </Picker>}
                                { v.ParaName=="原工作负责人" && <Picker 
                                selectedValue={this.state.showPage.selected2}
                                onValueChange={(value)=>this.onValueChange(2,value)}
                                style={{ height: 50, width: "100%" }} 
                                mode='dropdown' 
                                enabled={!dis}>
                                 {           
                                    this.state.searchRole.map((item,index)=>{
                                        return <Picker.Item label={item.realname} value={item.realname} key={index}/>
                                    })
                                }
                                </Picker>}
                                { v.ParaName=="变更后工作负责人" && <Picker 
                                selectedValue={this.state.showPage.selected3}
                                onValueChange={(value)=>this.onValueChange(3,value)}
                                style={{ height: 50, width: "100%" }} 
                                mode='dropdown' 
                                enabled={!dis}>
                                 {           
                                    this.state.searchRole.map((item,index)=>{
                                        return <Picker.Item label={item.realname} value={item.realname} key={index}/>
                                    })
                                }
                                </Picker>}
                                { v.ParaName=="制定专责监护人" && <Picker 
                                selectedValue={this.state.showPage.selected4}
                                onValueChange={(value)=>this.onValueChange(4,value)}
                                style={{ height: 50, width: "100%" }} 
                                mode='dropdown' 
                                enabled={!dis}>
                                 {           
                                    this.state.searchRole.map((item,index)=>{
                                        return <Picker.Item label={item.realname} value={item.realname} key={index}/>
                                    })
                                }
                                </Picker>}
                                </View>
                                :v.ParaTypeID==2?
                                <View>
                                    {v.ParaName=="单位" &&<InputItem  
                                value={v.ParaName}
                                editable={dis} 
                                onChange={(v)=>this.handleInput('danweiname',v)} 
                                style={dis?baise:huise} />}
                                    {v.ParaName=="编号" &&<InputItem  
                                    value={v.ParaName}
                                    editable={dis} 
                                    onChange={(v)=>this.handleInput('bianhao',v)} 
                                    style={dis?baise:huise} />}
                                    {v.ParaName=="班组" &&<InputItem  
                                value={v.ParaName}
                                editable={dis} 
                                onChange={(v)=>this.handleInput('classname',v)} 
                                style={dis?baise:huise} />}
                                    {v.ParaName=="工作发电厂名称" &&<InputItem  
                                    value={v.ParaName}
                                    editable={dis} 
                                    onChange={(v)=>this.handleInput('gongchang',v)} 
                                    style={dis?baise:huise} />}
                                    {v.ParaName=="设备名称" &&<InputItem  
                                value={v.ParaName}
                                editable={dis} 
                                onChange={(v)=>this.handleInput('poername',v)} 
                                style={dis?baise:huise} />}
                                    {v.ParaName=="工作地点" &&<InputItem  
                                    value={v.ParaName}
                                    editable={dis} 
                                    onChange={(v)=>this.handleInput('theway',v)} 
                                    style={dis?baise:huise} />}
                                    {v.ParaName=="工作设备" &&<InputItem  
                                value={v.ParaName}
                                editable={dis} 
                                onChange={(v)=>this.handleInput('shebei',v)} 
                                style={dis?baise:huise} />}
                                </View>
                                :v.ParaTypeID==5
                                ?<View style={{left:0,width:250}}>
                                {v.ParaName=="许可开始工作时间：" && <DatePicker
                                    style={{left:0}}
                                    value={this.state.showPage.value0}
                                    mode="date"
                                    minDate={new Date(2000, 1, 1)}
                                    maxDate={new Date(2040, 12, 31)}
                                    onChange={(value)=>this.onChange(0,value)}
                                    format="YYYY-MM-DD"
                                    disabled={dis}>
                                    <List.Item arrow="horizontal">选择时间：</List.Item>
                                </DatePicker>}
                                {v.ParaName=="有效期延长到" && <DatePicker
                                    style={{left:0}}
                                    value={this.state.showPage.value1}
                                    mode="date"
                                    minDate={new Date(2000, 1, 1)}
                                    maxDate={new Date(2040, 12, 31)}
                                    onChange={(value)=>this.onChange(1,value)}
                                    format="YYYY-MM-DD"
                                    disabled={dis}>
                                    <List.Item arrow="horizontal">选择时间：</List.Item>
                                </DatePicker>}
                                {v.ParaName=="开工时间" && <DatePicker
                                    style={{left:0}}
                                    value={this.state.showPage.value2}
                                    mode="date"
                                    minDate={new Date(2000, 1, 1)}
                                    maxDate={new Date(2040, 12, 31)}
                                    onChange={(value)=>this.onChange(2,value)}
                                    format="YYYY-MM-DD"
                                    disabled={dis}>
                                    <List.Item arrow="horizontal">选择时间：</List.Item>
                                </DatePicker>}
                                {v.ParaName=="收工时间" && <DatePicker
                                    style={{left:0}}
                                    value={this.state.showPage.value3}
                                    mode="date"
                                    minDate={new Date(2000, 1, 1)}
                                    maxDate={new Date(2040, 12, 31)}
                                    onChange={(value)=>this.onChange(3,value)}
                                    format="YYYY-MM-DD"
                                    disabled={dis}>
                                    <List.Item arrow="horizontal">选择时间：</List.Item>
                                </DatePicker>}
                                {v.ParaName=="工作结束时间" && <DatePicker
                                    style={{left:0}}
                                    value={this.state.showPage.value4}
                                    mode="date"
                                    minDate={new Date(2000, 1, 1)}
                                    maxDate={new Date(2040, 12, 31)}
                                    onChange={(value)=>this.onChange(4,value)}
                                    format="YYYY-MM-DD"
                                    disabled={dis}>
                                    <List.Item arrow="horizontal">选择时间：</List.Item>
                                </DatePicker>}
                                    </View>
                                         :v.ParaTypeID==6?
                                <View>
                                    <TextareaItem editable={!dis} 
                                                  placeholder="高度自适应" 
                                                  autoHeight 
                                                  style={{ paddingVertical: 5,
                                                    borderBottomWidth:2,
                                                    backgroundColor:"#fffeee" }} />
                                {v.IsConfirm==1?<View style={{flexDirection:'row',margin:5}}><Checkbox checked={!dis}><Text>是否已执行</Text></Checkbox></View>:<Text></Text>}
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
                                            onPress={()=>this.submitResult()}
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