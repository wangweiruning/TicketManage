import React from 'react';
import {InputItem,DatePicker,List,Checkbox,TextareaItem} from 'antd-mobile-rn';
import {View,Text,ScrollView,TouchableOpacity,Picker,TextInput} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import DropdownCheckbox from '../Component/DropdownCheckbox';
import TicketTitle from './TicketTitle';
import {TicketBasicInfo,
        searchTicketBasicInfo,
        searchTicketFlow,
        searchFlowRecord,
        searchTicketRecord,
        newTiceketNum,
        searchUserForRole,
        editquanxian,
        findbumen,
        findgroup
    } from './../api/api'
import {StackActions, NavigationActions} from 'react-navigation';
const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Tab' })],
    });
export default class Tdetail extends React.Component{
    constructor(props){
        super(props)
        this.state={
            nnnmmm:false,
            vvval:"超级管理员,111,版本",//获取流转对象
            part1Value:false,
            TiceketNum:"",
            username:'',
            userId:"",
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
            showPage:{
                isagree:null,//是否同意流转 0 同意 1 不同意
                isflew:"",//下一个流转状态
                isfleUser:"",//流转对象
            },
            pagedata:{},
            userPower:'',
            listdatas:[],
            subdatas:{},
            isagree:null,//是否同意流转 0 同意 1 不同意
            isflew:"",//下一个流转状态
            iscofrom:{},
            showChecked:{},
            groupName:[],
            chengyuanName:[],
            newpagedata:{},
            isgzfzr:""

        }
    }
      async componentDidMount(){
        this.getCanNotdata();
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
        const {templateID,ticketNum,typeName,departmentid,userId}= this.props.navigation.state.params; 

        
        /**
         * 获取票编号
         * newTiceketNum
         * **/
        const ids = '?form.templateId='+templateID;
        const TiceketNum = await newTiceketNum(ids);
        console.log(TiceketNum,"获取两票模板票id")
        this.setState({
            TiceketNum:TiceketNum.form.newTicket,
            userId:userId
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
            console.log(ticketFlowrole,"该流程所属类型的所有状态角色")
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
            
            this.setState({
                listdatas:list
            })
            let dataPage = {};
          x.form.templateContents.map((v,index)=>{
            if(v.IsConfirm==1) this.isconfoms('iscofrom'+index);
            if(index>0){
               
                let  listPageData={['datalist'+index]:null};
                dataPage=Object.assign(this.state.pagedata,listPageData);
                 this.getdefault(list,v,'datalist'+index);//获取默认值
            }   
        })
        this.setState({
            pagedata:dataPage
        })

            

            //获取组名称
            const group = "?form.tree_node_id="+departmentid+'&form.tree_node_operation=2';
            const bumen = await findbumen(group);
            console.log(bumen.form.page.dataRows,"获取部门")
            this.setState({
                groupName:bumen.form.page.dataRows
            })

            //获取部门成员
            const chengyuan = "?form.tree_node_id="+departmentid+'&form.tree_node_operation=0';
            const groupnumber = await findgroup(chengyuan)
            console.log(groupnumber.form.page.dataRows,"获取成员")

            this.setState({
                chengyuanName:groupnumber.form.page.dataRows
            })
            
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
                havChangeList:saves.form.dataList,
                nnnmmm:true
            })
        } 
    }
    getSelect(value,datalist){
        console.log(value,datalist)
        let s ={[datalist]:value};
        let data = Object.assign(this.state.pagedata,s)
        let data1 = Object.assign(this.state.newpagedata,s)
        this.state.pagedata=data;
        this.state.newpagedata=data1;
        this.state.isgzfzr=value;
        this.forceUpdate()
    }
    onChange(tt,value){
        let dd= new Date(value)
        let s ={[tt]:dd};
        let data = Object.assign(this.state.pagedata,s)
        let data1 = Object.assign(this.state.newpagedata,s)
        this.setState({
            pagedata:data,
            newpagedata:data1
        });
        console.log(dd,'sasf');
        
      }
      onChangecoform(value,dis){
          const listitem ={[value]:dis}
          const sss=Object.assign(this.state.showChecked,listitem)
        this.setState({
            showChecked:sss
        });
        
      }
    handleInput(k, v){
        let s ={[k]:v};
        let data = Object.assign(this.state.pagedata,s)
        let data1 = Object.assign(this.state.newpagedata,s)
        this.setState({
            pagedata: data,
            newpagedata:data1
        });
    }

    ischacked=(asd,iscofrom)=>{
        let sss = this.state.havChangeList;
        let index=0;
        if (sss.length>0) {
            sss.forEach(item=>{
                if(item.IsConfirm==1){
                    this.setState({
                        [iscofrom]:true
                    })
                }
            })

             index = sss.findIndex((v)=>{
                 return v.TicketParaID == asd;
           });
             return index!=-1;
        } else {
            return false;
        }  
    }

    isconfoms=(iscofrom)=>{
        const isco = {[iscofrom]:true}
        const dd = Object.assign(this.state.iscofrom,isco)
                    this.setState({
                        iscofrom:dd
                    })

    }
/**
 * 获取提交对象
 * **/
    open(val){
        let display = [];
    
        for(let i in val){
            if(val[i]){
                display.push(val[i]);
            }
        };
        this.state.showPage.isfleUser=display.join(",");
        this.setState({
            vvval:display.join(",")
        })
        this.forceUpdate()
    }
    openothers(val,leixing){
        let display = [];
    
        for(let i in val){
            if(val[i]){
                display.push(val[i]);
            }
        };
        let s ={[leixing]:display.join(",")};
        let data = Object.assign(this.state.pagedata,s)
        let data1 = Object.assign(this.state.newpagedata,s)
        this.setState({
            pagedata: data,
            newpagedata:data1
        });
    }
    isChange=(ss)=>{
        let sss = this.state.pagedata;
        let aa = Object.values(sss);
             return aa;
    }
    gotSubmit=()=>{
        return  <View style={{margin:5}}>
                        <Text>流转目标</Text>
                        <DropdownCheckbox open={this.open.bind(this)} style={{backgroundColor:'skyblue',borderRadius:5}} TextColor={{color:'black',fontSize:13}} SelectData={this.state.searchRole} color="skyblue"/>
                </View>
    }
    getliuzhuan=()=>{
        let arr=[];
        if (this.state.nextFlow!="") {
            arr.push(this.state.nextFlow)
            this.state.showPage.isflew=arr[0];
            return  <View style={{margin:5}}>
                        <Text style={{left:5}}>流转状态</Text>
                        <ModalDropdown  dropdownStyle={{width:'100%',height:45}} 
                                        textStyle={{color:'black',alignItems:'center',textAlign:'center',marginTop:7}} 
                                        style={{backgroundColor:'skyblue',borderRadius:5,height:30,width:'100%'}}
                                        defaultValue={arr[0]} 
                                        onSelect={(index,value)=>this.changeAgree(1,value)}
                                        options={arr}/>
                    </View>
            } else {
                return  <View style={{margin:5}}>
                <Text style={{left:5}}>流转状态</Text>
                <ModalDropdown  dropdownStyle={{width:'100%',height:45}} 
                                textStyle={{color:'black',alignItems:'center',textAlign:'center',marginTop:7}} 
                                style={{backgroundColor:'skyblue',borderRadius:5,height:30,width:'100%'}}
                                defaultValue={"请选择"} 
                                onSelect={(index,value)=>this.changeAgree(1,value)}
                                options={arr}/>
            </View>   
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
        return <View style={{height:50,margin:5}}>
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

    getdefault(datas,v,datalist){
        let s={};
        var data={};
            datas.map((item,i)=>{
                if(item.TicketParaID==v.TicketParaID){
                    s ={[datalist]:item.TicketParaValue};
                    console.log(s,"555555555")
                            data = Object.assign(this.state.pagedata,s);
                        this.setState({
                            pagedata: data
                        }); 
                }
                          
        })
      }

    submitResult(){
       const usrid= window.jconfig.userinfo;
       console.log(usrid,"用户id")
        const {pagedata,showPage,showChecked} = {...this.state};
        const commpage={
            TiceketNum:this.state.TiceketNum,
            userId:this.state.userId
        }
        const datas=Object.assign(pagedata,showPage,showChecked,commpage)
        console.log(datas,"333333333333")
    }
    getGzryName(datalist,value,names,isgzfzr){
        let users = '';
        if(names=="工作负责人"){
            this.state.chengyuanName.map(pagename=>{
                if(value==pagename.id){
                    users= pagename.loginname
                }
            })
            users= isgzfzr?isgzfzr:users
        }else{
            this.state.chengyuanName.map(pagename=>{
                if(value==pagename.id){
                    users= pagename.loginname;
                }
            })
            users= users
        }
        return users?users:"请选择"
    }
    BackpageUseName(datalist,ids){
        let pageUseName=[];
        this.state.chengyuanName.map(pagename=>{
            pageUseName.push(pagename.loginname);//loginname登录名  realname权限名
        })
        return pageUseName
    }
    render(){
        return(<View style={{justifyContent:'center'}}>
                    <TicketTitle navigation={this.props.navigation} num={this.state.nnnmmm}
                        centerText={this.props.navigation.state.params.typeName+""+this.props.navigation.state.params.ticketNum}/>
                   
                    <ScrollView style={{display:'flex'}}>
                        {
                            this.state.templateContents.map((v,i)=>{
                                let dis = this.ischacked(v.TicketParaID);
                                let itemMsg = this.isChange(i);
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
                            {   v.ParaTypeID==4? 
                                <DropdownCheckbox open={this.openothers.bind(this)} isshow={!dis} 
                                leixin={"datalist"+i}
                                defaultValue={itemMsg[i-1]?itemMsg[i-1]:"请选择"} style={{backgroundColor:'white',height:50}}  TextColor={{color:'black',fontSize:13}} 
                                SelectData={v.ParaName=="班组"?this.state.searchRole:this.state.searchRole} canClick={dis}/>
                                :v.ParaTypeID==3?
                                 <ModalDropdown 
                                    disabled={!dis}
                                    dropdownStyle={{width:'100%'}} 
                                    textStyle={{color:'black',fontSize:13,left:5}} 
                                    style={{backgroundColor:'skyblue',width:'100%',
                                    height:29.3,justifyContent:'center'}} 
                                    defaultValue={this.getGzryName("datalist"+i,itemMsg[i-1],v.ParaName,this.state.isgzfzr)} 
                                    onSelect={(e,value)=>this.getSelect(value,'datalist'+i)}
                                    options={this.BackpageUseName()}/>  
                                :v.ParaTypeID==2?
                                <View>
                                   <TextInput  
                                    value={itemMsg[i-1]}
                                    editable={dis} 
                                    onChangeText={(v)=>this.handleInput('datalist'+i,v)} 
                                    style={{borderRadius:5,backgroundColor:'white',width:'100%',backgroundColor:"#fffeee"}} />
                                        {v.IsConfirm==1?<View style={{flexDirection:'row',margin:5}}>
                                        <Checkbox
                                            onChange={(e)=>this.onChangecoform('Checkbox'+i,e.target.checked)}
                                            disabled={!dis}
                                        ><Text>是否已执行</Text></Checkbox></View>:<Text></Text>}
                                </View>:v.ParaTypeID==5
                                ?
                                 <DatePicker
                                    value={itemMsg[i-1]?new Date(itemMsg[i-1]):null}
                                    mode="datetime"
                                    onOk={()=>this.setState({
                                        value:itemMsg[i-1] 
                                    })}
                                    minDate={new Date(2000, 1, 1)}
                                    onChange={(value)=>this.onChange('datalist'+i,value)}
                                    format="YYYY-MM-DD HH:mm"
                                    disabled={!dis}
                                    >
                                    <List.Item arrow="horizontal">选择时间：</List.Item>
                                </DatePicker>:v.ParaTypeID==6?
                                <View>
                                  <TextareaItem editable={dis} 
                                                  placeholder="高度自适应" 
                                                  defaultValue={itemMsg[i-1]}
                                                  onChangeText={(v)=>this.handleInput('datalist'+i,v)}
                                                  autoHeight 
                                                  style={{ paddingVertical: 5,
                                                    borderBottomWidth:2,
                                                  backgroundColor:"#fffeee" }} />
                                                              
                                {v.IsConfirm==1?<View style={{flexDirection:'row',margin:5}}><Checkbox  onChange={(e)=>this.onChangecoform('Checkbox'+i,e.target.checked)}
                                            disabled={!dis}><Text>是否已执行</Text></Checkbox></View>:<Text></Text>}
                                </View>:<Text></Text>
                            }
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