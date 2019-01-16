import { ActivityIndicator, TextareaItem } from 'antd-mobile-rn';
import React from 'react';
import { Alert, Image, ScrollView, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import CheckBox from 'react-native-checkbox';
import DatePicker from 'react-native-datepicker';
import ModalDropdown from 'react-native-modal-dropdown';
import { NavigationActions, StackActions } from 'react-navigation';
import DropdownCheckbox from '../Component/DropdownCheckbox';
import { AllDepartment, AllMangerUser, editquanxian, ForDepartment, historys, newTiceketNum, searchFlowRecord, searchTicketFlow, searchTicketRecord, searchUserForRole, TicketBasicInfo, tijiao } from './../api/api';
import TicketTitle from './TicketTitle';
import Model from './Model';
const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Tab' })],
});
export default class Tdetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            qwer:'',
            xccv:'',
            nnnmmm: false,
            vvval: "",//获取流转对象
            part1Value: false,
            TiceketNum: "",
            username: '',
            userId: "",
            templateContents: [],//获取模板列表
            dataList: [],//两票基本信息
            ticketFlowrole: [],//当前类型两票流程
            searchRole: [],//提交对象
            havChangeList: [],//获取可编辑模块
            nextFlowId: "",//下一个流转id
            nextFlow: [],//下一个流转流程
            ticketstatusid: '',//当前流程id
            statusId: "",
            statusId1:"",
            TicketTypeID: "",//票类型id
            aggree: 1,//是否同意提交
            detailinfo: "",
            havelist: [],
            ContentID: "",
            rolecontentid: "",
            showPage: {
                isagree: null,//是否同意流转 0 同意 1 不同意
                isflew: "",//下一个流转状态
                isfleUser: "",//流转对象
            },
            pagedata: {},
            userPower: '',
            listdatas: [],
            subdatas: {},
            isagree: null,//是否同意流转 0 同意 1 不同意
            isflew: "",//下一个流转状态
            iscofrom: {},
            showChecked: {},
            groupName: [],
            chengyuanName: [],
            newpagedata: {defaultvalue:'1'},
            isgzfzr: "",
            index: "",
            isBack: "",
            skipFlowId: "",
            getAllTempanyId: [],//获取所有模块id
            agreeLiuzhuan: 1,
            loading: false,
            flowRoleId: "",
            newChecked: {},//是否选中
            ParaId: [],
            ischanges: false,
            mengCard: true,
            moredata: {},
            isadd: {},
            additem: {},
            showmore: true,
            datamore: {},
            getmoretextarea:{},
            allFlowRole:[],
            backStatusId:[],
            backRoleId:[],
            FlowRoleID:[],
            ticketFlowList:[] ,//已经经过的流程,
            sonList:[],//子流程
            fatherIndex:-1,//父流程索引
            sonIndex:-1,//子流程索引
            arrFuFlowRoleID:[],//父子流程合计FlowRoleID
            targetFlowId:'',//流转targetFlowId
            sonstatusid:[],//子流程状态id
            currentstatusid:'',//获取当前状态id
            tickstateid:[],
            ticketID:'',
            nextFlowarr:[],
            nextFlowIdarr:[],
            nextStatusIdarr:[],
            nextFlowRoleIdarr:[],
            nextRoleIdarr:[],
            currentflowroleid:[]
        }
    }

     componentDidMount() {
        this.getCanNotdata();
    }

    componentWillUnmount = () => {
        this.setState = (state,callback)=>{
          return;
        };
      }



async getliucheng(){
    const { templateID, ticketNum, typeName, departmentid,ticketbasicinfoid } = this.props.navigation.state.params;
		var ticketFlowList = [];//定义当前流程所有状态
		var fatherIndex = -1;//定义当前状态在主流程中按流程角色排序的下标
		var sonIndex = -1;//定义当前状态在子流程中按流程角色排序的下标
		var flowRoleId = "";	//定义流程角色id
		var basicInfoId = "";
		var fatherFlowId = "";
		var allFatherList = [];//定义所有主流程，按流程角色排序
		var fatherList = [];//定义所有主流程（去除作废），按流程角色排序
		var sonList = [];//定义所有子流程，按流程角色排序
		var son_list = [];//定义当前子流程的所有流程角色，按流程角色排序
		var flowdata = {};//定义当前流程的详细信息对象
		var cur_FlowRole = [];//定义当前为主流程流向子流程时当前信息转化的对象数组
		var target_FlowRole = [];//定义当前为主流程流向子流程时的目标流程信息对象数组
		
		//定义正常流转时下一个流程相关信息
		var nextFlowId = "";
		var nextStatusId = "";
		var nextStatusName = "";
		var nextFlowRoleId = "";
		var nextRoleId = "";
		isAlter=1;
		// var ticketbasicinfoid=ticketbasicinfoid;
		
		//获取该类型的父级和子集流程（父级去除作废）
				allFatherList = this.state.allFlowRole;
				sonList = this.state.sonList;
				//去除作废流程
				for(var i = 0; i < allFatherList.length; i ++){
					if(allFatherList[i].ticketstatusname != "作废"){
						fatherList.push(allFatherList[i]);
                    }
                    
				}
		
		if(ticketNum){	//已有两票编号
                    var ticketFlowdata = this.state.ticketFlowList;
					basicInfoId = ticketFlowdata[0].TicketBasicInfoID;
                    ticketFlowList = ticketFlowdata;
                    
					if(ticketFlowList[0].ManageTime){
						flowRoleId = ticketFlowList[ticketFlowList.length - 1].FlowRoleID;	//按时间顺序排序，当两票完结或作废时为最后一条
						flowRoleId0 = ticketFlowList[ticketFlowList.length - 1].FlowRoleID;
						flag_over = true;
					}else{
						flowRoleId = ticketFlowList[0].FlowRoleID;	//按时间顺序排序，两票未完成时处理时间为空，排在第一条
						flowRoleId0 = ticketFlowList[0].FlowRoleID;
                    }
                    
			for(var i = 0; i < fatherList.length; i++){
				if(fatherList[i].FlowRoleID == flowRoleId){
					fatherIndex = i;
					break;
				}
			}
            
            
			//从记录表中获取已流过流程的所有参数及参数值
				record_list = this.state.listdatas;
				
			if(fatherIndex == -1){	//当前流程为子流程时
				var son_flowId = "";
				for(var i = 0; i < sonList.length; i++){
					if(sonList[i].FlowRoleID == flowRoleId){
						flowdata = sonList[i];
						sonIndex = parseInt(sonList[i].ticketrolerank) - 1;
						fatherFlowId = sonList[i].fatherid;
						son_flowId = sonList[i].ticketflowid;
						break;
					}
				}
				for(var i = 0; i < sonList.length; i++){
					if(sonList[i].ticketflowid == flowdata.ticketflowid){	//同一个子流程下所有流程角色
						son_list.push(sonList[i]);
					}
				}

				
			
				if(isAlter == 1){
					//设置流转状态及流转目标
					if(sonIndex == son_list.length - 1){	//当前流程角色为该子流程的最后一个流程角色时
						var ticketRoleId = son_list[0].ticketroleid;
						for(var i = 0; i < fatherList.length; i++){
							if(fatherList[i].ticketflowid == fatherFlowId && fatherList[i].ticketroleid == ticketRoleId){	//获取当前子流程所属主流程的第一个流程角色
								nextFlowId = fatherList[i].ticketflowid;
								nextStatusId = fatherList[i].ticketstatusid;
								nextStatusName = fatherList[i].ticketstatusname;
								nextFlowRoleId = fatherList[i].FlowRoleID;
								nextRoleId = fatherList[i].ticketroleid;
							}
						}
					}else{	//流程流向该子流程的下一个流程角色
						nextFlowId = son_list[sonIndex + 1].ticketflowid;
						nextStatusId = son_list[sonIndex + 1].ticketstatusid;
						nextStatusName = son_list[sonIndex + 1].ticketstatusname;
						nextFlowRoleId = son_list[sonIndex + 1].FlowRoleID;
						nextRoleId = son_list[sonIndex + 1].ticketroleid;
					}
				
                    let nextStatusNamedarr= [nextStatusName];//获取下一个状态名字
                        let nextFlowIdarr = [nextFlowId];
                        let nextStatusIdarr= [nextStatusId];
                        let nextFlowRoleIdarr = [nextFlowRoleId];
                        let currentflowroleid=[nextFlowRoleId];
                        let nextRoleIdarr = [nextRoleId];    
                        this.setState({
                            nextFlowarr:nextStatusNamedarr,
                            nextFlowIdarr:nextFlowIdarr,
                            nextStatusIdarr:nextStatusIdarr,
                            nextFlowRoleIdarr:nextFlowRoleIdarr,
                            nextRoleIdarr:nextRoleIdarr,
                            currentflowroleid:currentflowroleid
                        })

					
				}
				
            }else{	//当前流程为主流程时
				flowdata = fatherList[fatherIndex];
				
				for(var i = 0; i < sonList.length; i++){
					if(sonList[i].fatherid == flowdata.ticketflowid && sonList[i].ticketrolerank == 1 && sonList[i].ticketroleid == flowdata.ticketroleid){
						// editFlowRoleIds += "," + sonList[i].FlowRoleID;
						var curFlowMap = {
								"son_flowid": sonList[i].ticketflowid,
								"son_firstflowroleid": sonList[i].FlowRoleID,
								"son_statusid": sonList[i].ticketstatusid,
								"son_statusname": sonList[i].ticketstatusname,
								"son_roleid": sonList[i].ticketroleid,
								"son_fatherflowid": flowdata.ticketroleid
						};
						cur_FlowRole.push(curFlowMap);
					}
				}
				
				for(var i = 0; i < cur_FlowRole.length; i++){
					var sameFlow = [];
					for(var j = 0; j < sonList.length; j++){
						if(sonList[j].fatherid == flowdata.ticketflowid && sonList[j].ticketflowid == cur_FlowRole[i].son_flowid){
							sameFlow.push(sonList[j]);
						}
					}
					
					var tarFlowMap = {};
					if(sameFlow.length > 1){
						tarFlowMap = {
								"target_flowid": sameFlow[1].ticketflowid,
								"target_flowroleid": sameFlow[1].FlowRoleID,
								"target_statusid": sameFlow[1].ticketstatusid,
								"target_statusname": sameFlow[1].ticketstatusname,
								"target_roleid": sameFlow[1].ticketroleid,
						};
					}else if(sameFlow.length == 1){
						tarFlowMap = {
								"target_flowid": flowdata.ticketflowid,
								"target_flowroleid": flowdata.FlowRoleID,
								"target_statusid": flowdata.ticketstatusid,
								"target_statusname": flowdata.ticketstatusname,
								"target_roleid": flowdata.ticketroleid,
						};
					}
					target_FlowRole.push(tarFlowMap);
				}
				
				
				if(isAlter == 1){
					//设置流转状态及流转目标
					if(fatherIndex == fatherList.length - 1){	//当前为最后一个主流程时
					
					}else{	//下一个主流程
						nextFlowId = fatherList[fatherIndex + 1].ticketflowid;//FlowId
						nextStatusId = fatherList[fatherIndex + 1].ticketstatusid;//statusid
						nextStatusName = fatherList[fatherIndex + 1].ticketstatusname;//statusname
						nextFlowRoleId = fatherList[fatherIndex + 1].FlowRoleID;//FlowRoleId
                        nextRoleId = fatherList[fatherIndex + 1].ticketroleid;

                        let nextStatusNamedarr= [nextStatusName];//获取下一个状态名字
                        let nextFlowIdarr = [nextFlowId];
                        let nextStatusIdarr= [nextStatusId];
                        let nextFlowRoleIdarr = [nextFlowRoleId];
                        let currentflowroleid=[nextFlowRoleId];
                        let nextRoleIdarr = [nextRoleId];
               
               
                        cur_FlowRole.map((item,i)=>{
                            nextStatusNamedarr.push(item.son_statusname);
                            nextFlowIdarr.push(target_FlowRole[i].target_flowid);
                            nextStatusIdarr.push(target_FlowRole[i].target_statusid);
                            nextFlowRoleIdarr.push(target_FlowRole[i].target_flowroleid);
                            nextRoleIdarr.push(target_FlowRole[i].target_roleid);
                            currentflowroleid.push(item.son_firstflowroleid);
                        })
                        
                        this.setState({
                            nextFlowarr:nextStatusNamedarr,
                            nextFlowIdarr:nextFlowIdarr,
                            nextStatusIdarr:nextStatusIdarr,
                            nextFlowRoleIdarr:nextFlowRoleIdarr,
                            nextRoleIdarr:nextRoleIdarr,
                            currentflowroleid:currentflowroleid
                        })

					}
                }
				
			}
			
			
        }
}


    //获取模板列表
    async getCanNotdata() {
        var ticketFlowrole = [];//定义该流程所属类型的所有状态角色
        var statusId = "";//定义该流程的状态id
        var statusId1="";
        var roleId = "";//定义登陆用户的角色id
        var ticketFlowList = [];//定义当前流程所有状态
        var index = 0;//定义当前状态在所有状态的下标
        var skipFlowId = "";	//获取当前流程能跳转的流程id，0为不能跳转
        var isBack = "";	//获取当前流程是否能回转，1为能回转，0为不能回转
        var fatherIndex = -1;
        var sonIndex = -1;
        const { templateID, ticketNum, typeName, departmentid,ticketbasicinfoid } = this.props.navigation.state.params;
        const geturlid = "?form.tree_node_operation=" + 0;
        const result = await historys(geturlid);
        const userId = result.form.userId;
        /**
         * 获取票编号
         * newTiceketNum
         * **/
        const ids = '?form.templateId=' + templateID;
        const TiceketNum = await newTiceketNum(ids);
        this.setState({
            TiceketNum: TiceketNum.form.newTicket,
            userId: userId
        })



        let r = '?form.jqgrid_row_selected_id=' + templateID;
        let x = await TicketBasicInfo(r);//获取模板
        if (x.form.templateContents.length > 0) {

            this.setState({
                templateContents: x.form.templateContents
            })
        }

        //查询当前两票基本信息  
        let aas = '?form.ticketNum=' + ticketNum;
        // let searchs = await searchTicketBasicInfo(aas);
        //设置流转状态及目标用户，展示流程记录

        //当前类型两票流程
        //根据类型名称查询流程状态角色并排序显示
        let data = `?form.ticketTypeName=${typeName}`;
        let liucheng = await searchTicketFlow(data);
        // return;
        ticketFlowrole = liucheng.form.fatherList;//该流程所属类型的所有状态角色
        //去除作废流程
        let newTicket =[];
        ticketFlowrole.map((item, i) => {
            if (item.ticketstatusname != "作废") {
                 newTicket.push(item)
             }

        })
       
        this.setState({
            sonList:liucheng.form.sonList,
            ticketFlowrole: ticketFlowrole,
            allFlowRole: liucheng.form.fatherList
        })
        if (ticketNum) {//数据库中已有记录
            
            let qwer = liucheng.form.fatherList[1].ticketstatusid;
            // 这里需要获取已经经过的流程fl
            const flewFrom = "?form.basicInfoId=" + ticketbasicinfoid;
            const ticket = '?form.ticketNum='+ticketNum;
            const FlowList = await searchFlowRecord(ticket)
            
            ticketFlowList = FlowList.form.dataList;//获取当前流程所有状态
            if (ticketFlowList[0].ManageTime) {
                flowRoleId = ticketFlowList[ticketFlowList.length - 1].FlowRoleID;	//按时间顺序排序，当两票完结或作废时为最后一条
                statusId = ticketFlowList[ticketFlowList.length - 1].FlowRoleID;
                statusId1= ticketFlowList[ticketFlowList.length - 1].FlowRoleID;
               
            } else {
                flowRoleId = ticketFlowList[0].FlowRoleID;	//按时间顺序排序，两票未完成时处理时间为空，排在第一条
                statusId = ticketFlowList[0].FlowRoleID;
                statusId1= ticketFlowList[0].FlowRoleID;
            }
            let fatherList = liucheng.form.fatherList;
            for(var i = 0; i < fatherList.length; i++){
				if(fatherList[i].FlowRoleID == flowRoleId){
					fatherIndex = i;
					break;
				}
            }
            let sonList = liucheng.form.sonList;
            
          
            //将已填写的参数值填入页面
            const TicketRecord = await searchTicketRecord(flewFrom);
            const list = TicketRecord.form.dataList;//获取到票数据内容，等待传入页面
            this.setState({
                fatherIndex:fatherIndex,
                qwer:qwer,
                statusId: statusId,
                statusId1:statusId1,
                listdatas: list,
                ticketFlowList:ticketFlowList,//已经经过的流程
            })
            let dataPage = {};
            let getAllTempanyId = [];
            let dataid = "";
            let aas = {};
            x.form.templateContents.map((v, index) => {
                dataid = v.TicketParaID
                getAllTempanyId.push(dataid)
                if (v.IsAdd == 1) {
                    aas = Object.assign(this.state.isadd, { [v.TicketParaID]: 1 });
                }
                this.setState({
                    getAllTempanyId: getAllTempanyId,
                    isadd: aas
                })
            })
            this.getdefault(list);//获取默认值




            //获取组名称
            let bumen = await AllDepartment();
           
            let y = `?form.departmentId=`
            let Team = await ForDepartment(y) //根据部门id获取用户
            //获取工作负责人
            const groupnumber = await AllMangerUser()
           
            const paramsItem = "?form.flowroleid=" + ticketFlowList[0].FlowRoleID;
            const saves = await editquanxian(paramsItem);//获取可编辑内容区域
            let tt;
            saves.form.dataList.map(item=>{
                 tt = Object.assign(this.state.newpagedata,{[item.TicketParaID]:item.ParaName=='班组'|| item.ParaName=='班组成员'?null:''});
            })
            this.setState({
                nnnmmm: true,
                groupName: bumen.form.dataList,
                chengyuanName: groupnumber.form.dataList,
                havChangeList: saves.form.dataList,
                ParaId: Team.form.dataList,
                newpagedata:tt
            })

            //设置提交目标
            for (var i = 0; i < newTicket.length; i++) {
                
                let ticketrolerank = newTicket[i].ticketrolerank;
                if (newTicket[i].FlowRoleID == flowRoleId) {
                    index = i;
                    break;
                }
              
            }
            this.setState({
                index: index
            })
          

            if (this.props.navigation.state.params.isqianfa) {
                if (index > newTicket.length - 2) { //最后两个状态为验收和作废，均为终结流程
                    ToastAndroid.show(`${this.props.navigation.state.params.typeName}已终结！！！`,ToastAndroid.SHORT);
                    this.setState({ mengCard: false,flowRoleId: flowRoleId })
                    return false;
                } else {
                    //设置流转状态及流转目标
                    var nextFlowId = newTicket[index + 1].ticketflowid;//下一个流程id
                    var nextFlow = newTicket[index + 1].ticketstatusname;//
                    var FuFlowRoleID = newTicket[index + 1].FlowRoleID;
                    let arr = [nextFlow];
                    let arrFuFlowRoleID = [FuFlowRoleID];
                    let sons = liucheng.form.sonList;
                    let allFlowId =[newTicket[index + 1].ticketroleid];
                 
                    let currentstatusid =newTicket[index + 1].ticketstatusid; //获取当前状态id-----ticketstatusid
                    let sonstatusid =[currentstatusid];//子流程状态id
                  

                    this.setState({
                        nextFlow: arr,
                        flowRoleId: FuFlowRoleID,
                        arrFuFlowRoleID:arrFuFlowRoleID,//获取所有的targetFlowId值
                        targetFlowId:arrFuFlowRoleID[0],//设置默认targetFlowId
                        sonstatusid:sonstatusid,
                        currentstatusid:currentstatusid,
                        
                    })
                    var nextRoleId = newTicket[index + 1].ticketroleid;
                    const dui = "?form.roleId=" + nextRoleId;
                    const searchRole = await searchUserForRole(dui);//获取提交对象
                   
                    this.setState({
                        nextFlowId: newTicket[index].ticketflowid,
                        searchRole: searchRole.form.dataList,
                        FlowRoleID:allFlowId
                    })
                }

                skipFlowId = newTicket[index].skipflowid;
                isBack = newTicket[index].isback;
               
                this.setState({
                    isBack: isBack,
                    skipFlowId: skipFlowId
                })
                
                if (skipFlowId == 0 && isBack == 0) {
                    this.setState({
                        aggree: 1
                    })
                } else {
                    this.setState({
                        aggree: 2
                    })
                }
            }
        }
        setTimeout(()=>ToastAndroid.show("加载完毕", ToastAndroid.SHORT))
        this.setState({ mengCard: false })
        // this.getSubdata(this.state.index, this.state.ticketFlowrole);

        
        this.getliucheng();
    }
    getSelect(e, value, datalist) {
        let s = { [datalist]: [value] };
        let ss = "";
        /***
 * searchRole
 *chengyuanName
 *  ***/
        this.state.chengyuanName.map(pagename => {
            if (value == pagename.realname) {
                ss = pagename.userid
            }
        })
        let ssss = { [datalist]: ss }
        let data = Object.assign(this.state.pagedata, s)
        let data1 = Object.assign(this.state.newpagedata, ssss)
        this.state.pagedata = data;
        this.state.newpagedata = data1;
        this.state.aggree = e + 1;
        this.forceUpdate()
    }

    onChange(tt, value) {
       
        let s = { [tt]: value };
        let s2 = { [tt]: value };
        let data = Object.assign(this.state.pagedata, s)
        let data1 = Object.assign(this.state.newpagedata, s2)
        this.setState({
            pagedata: data,
            newpagedata: data1
        });

    }
    onChangeTextCheck(value, dis,isdiss) {
      
        if(!isdiss)return;
        let checkeds = this.state.newChecked[value];
        let s=checkeds!=undefined? checkeds:0;
        s= !dis?1:0;
     
        this.state.newpagedata[value]=s;
        this.state.newChecked[value] =s;
        this.setState(this.state)  
    }
    onChangecoform(value, dis,index) {
        let checkeds = this.state.newChecked[value];
        let s=checkeds!=undefined? checkeds.split("&$"):["0"];
        s[index] = !dis?"1":"0";
       
        this.state.newpagedata[value]=s;
        this.state.newChecked[value] =s.join("&$");
        this.setState(this.state)  
    }
    handleInput(k, v) {
        let s = { [k]: v };
        let data = Object.assign(this.state.pagedata, s)
        let data1 = Object.assign(this.state.newpagedata, s)
        this.setState({
            pagedata: data,
            newpagedata: data1
        });
    }

    ischacked = (asd) => {
        let sss = this.state.havChangeList;
        let index = 0;
        if (sss.length > 0 && !this.props.navigation.state.params.canot) {
            index = sss.findIndex((v) => {
                return v.TicketParaID == asd;
            });
            return index != -1;
        } else {
            return false;
        }
    }

    isconfoms = (iscofrom) => {
        const isco = { [iscofrom]: true }
        const dd = Object.assign(this.state.iscofrom, isco)
        this.setState({
            iscofrom: dd
        })

    }
    /**
     * 获取提交对象
     * **/
    open(val) {
       
        let display = [];
        let Datastring = Object.keys(val);
        let Datavalues = Object.values(val);
        let arrs = [];
        Datavalues.map((item, indexs) => {
            if (item != "") {
                arrs.push(Datastring[indexs])
            }
        })
        for (let i in val) {
            if (val[i]) {
                display.push(val[i]);
            }
        };
        
        this.state.showPage.isfleUser = display.join(",");
        this.setState({
            vvval: arrs.join(",")
        })
        this.forceUpdate()
    }



    async openothers(val, leixing, ParaName) {
        let display = [];
        let datas = [];
        let alljsitem = Object.keys(val);
        let alljsv = Object.values(val);
        let tts = [];
        let params = [];
        let newarr = [];
        alljsv.findIndex((item, index) => {
            if (item != "") {
                tts.push({ [alljsitem[index]]: alljsv[index] });
                newarr.push(alljsitem[index]);
            }
        })
        tts.map(item => {
            params.push(Object.keys(item)[0])
        })

        if (ParaName == "班组") {
        

            let y = params == '' ? `?form.departmentId=` : `?form.departmentId=${params.join(",")}`
            let Team = await ForDepartment(y)
            this.setState({ ParaId: [] }, () => {
                this.state.ischanges = true;
                this.state.ParaId = Team.form.dataList;
              
                this.forceUpdate()
            })
        } else {
          
            this.state.ischanges = false;
            this.forceUpdate()
        }

        for (let i in val) {
            if (val[i]) {
                display.push(val[i]);
            }
        };
        let s = { [leixing]: display.join(",") };
        let ss = { [leixing]: newarr };
        let data = Object.assign(this.state.pagedata, s)
        let data1 = Object.assign(this.state.newpagedata, ss)
        this.setState({
            pagedata: data,
            newpagedata: data1
        });
    }
    isChange = (ss) => {
        let sss = this.state.pagedata;
        let aa = Object.values(sss);
        return aa;
    }
    gotSubmit = () => {
        return <View style={{ width: '96%',paddingBottom: 8, paddingTop: 8 ,borderBottomColor:'#e9e9ef',borderStyle:'solid',borderBottomWidth:1}}>
                    <Text style={{ color: '#363434'}}>流转目标</Text>
                    <DropdownCheckbox open={this.open.bind(this)}  TextColor={{ color: '#363434', fontSize: 13,}}
                        style={{  height: 29.3, justifyContent: 'center'}} SelectData={this.state.searchRole} />
                        
        </View>
    }
    getliuzhuan = () => {
        let arr = this.state.nextFlowarr;
        
        this.state.showPage.isflew = arr[0];
        return <View style={{ flexDirection: 'row', width: '96%',
        alignItems: 'center', paddingBottom: 8, paddingRight: 8, paddingTop: 8,borderBottomColor:'#e9e9ef',borderStyle:'solid',borderBottomWidth:1 }}>
            <Text style={{  color: '#363434',flex:1 }}>流转状态</Text>
            <ModalDropdown dropdownTextStyle={{ fontSize: 15 }}
                dropdownStyle={{width:'50%',backgroundColor:'#eee',borderWidth:0,elevation:3}}
                textStyle={{ color: '#363434', fontSize: 13 }}
                style={{ justifyContent: 'center' }}
                defaultValue={arr[0] ? arr[0] : "请选择"}
                defaultValue={"==请选择=="}
                onSelect={(index, value) => this.changeAgree(index, 1, value)}
                options={arr} />
        </View>

    }
    async getNewSubdeta(index, isBack, ticketFlowRole, skipFlowId) {
        //设置回转状态及回转目标
        
        var backStatusId = [];//状态id
        var backRoleId = [];  //roleid
        let NewArr = [];      //状态名字
        let FlowRoleID = [];// FlowRoleID
        let nextFlowRoleId = [];
        if (isBack == 1) {
            for (var i = 0; i < index; i++) {
                if (ticketFlowRole[i].ticketrolerank == 1) {
                    backStatusId.push(ticketFlowRole[i].ticketstatusid);
                    let itemarr = '回转-' + ticketFlowRole[i].ticketstatusname;
                    backRoleId.push(ticketFlowRole[i].ticketroleid)
                    NewArr.push(itemarr)
                    FlowRoleID.push(ticketFlowRole[i].ticketflowid)
                    nextFlowRoleId.push(ticketFlowRole[i].FlowRoleID)
                }
            } 
        }
  
        
        let allFlowRole = this.state.ticketFlowrole;
        if (skipFlowId != 0) {
            for (var i = 0; i < allFlowRole.length; i++) {
                if (allFlowRole[i].ticketflowid == skipFlowId) {
                    NewArr.push('跳转-'+allFlowRole[i].ticketstatusname) 
                    backStatusId.push(allFlowRole[i].ticketstatusid)
                    backRoleId.push(allFlowRole[i].ticketroleid)
                    FlowRoleID.push(allFlowRole[i].ticketflowid)
                    nextFlowRoleId.push(ticketFlowRole[i].FlowRoleID)
                };
            }
        }

       
        let nextFlowIdarr = FlowRoleID;
        let nextStatusIdarr= backStatusId;
        let nextFlowRoleIdarr = nextFlowRoleId;
        let currentflowroleid=nextFlowRoleId;
        let nextRoleIdarr = backRoleId
        //获取提交对象
        const dui = "?form.roleId=" + backRoleId[0];
        const searchRole = await searchUserForRole(dui);//获取提交对象

        this.setState({
            nextFlowId:FlowRoleID[0],
            nextFlowarr: NewArr,
            searchRole: searchRole.form.dataList,
            nextStatusIdarr:nextStatusIdarr,
            nextRoleIdarr:nextRoleIdarr,
            nextFlowIdarr:nextFlowIdarr,
            nextFlowRoleIdarr:nextFlowRoleIdarr,
            currentflowroleid:currentflowroleid
        })
    
    }

    async getSubdata(index, ticketFlowrole) {

        let ticketFlowList = this.state.ticketFlowList;//获取经过的流程
        let flowRoleId = '';
        if (ticketFlowList[0].ManageTime) {
            flowRoleId = ticketFlowList[ticketFlowList.length - 1].FlowRoleID;	//按时间顺序排序，当两票完结或作废时为最后一条
        } else {
            flowRoleId = ticketFlowList[0].FlowRoleID;	//按时间顺序排序，两票未完成时处理时间为空，排在第一条
        }

        this.state.flowRoleId = flowRoleId;//设置新的流程

        if (index > ticketFlowrole.length - 2) { //最后两个状态为验收和作废，均为终结流程
            return;
        } else {
         
            var nextFlow = ticketFlowrole[index + 1].ticketstatusname;//下一个流程状态
            let arr = [nextFlow];
          
            // let arrFuFlowRoleID = [FuFlowRoleID];
            var nextRoleId = ticketFlowrole[index + 1].ticketroleid;
            
           


            const dui = "?form.roleId=" + nextRoleId;
            let tt = ticketFlowrole[index + 1].ticketflowid;
          
            this.state.nextFlowId = tt;
            const searchRole = await searchUserForRole(dui);//获取提交对象
            
            this.setState({
                nextFlow: arr,
                searchRole: searchRole.form.dataList,
                

            })
          
        }
    }
    changeAgree = async(index, flag, value) => {
        let arr = [];
        arr.push(value)
    
        if (flag == 0) {//是否同意
            
            if (index == 0) {//同意
                this.setState({ agreeLiuzhuan: 1 })
                this.getliucheng();
                this.getSubdata(this.state.index, this.state.ticketFlowrole)
            } else {//不同意
                this.setState({ agreeLiuzhuan: 2 })
                this.getNewSubdeta(this.state.index, this.state.isBack, this.state.ticketFlowrole, this.state.skipFlowId);//获取新的流转对象和新的提交对象
            }
            
          
        }
        
        if(flag==1){//流转状态
            
            let roleid =this.state.nextRoleIdarr[index];
            
                if(index>0){
                    statusId = this.state.currentflowroleid[index];

                }else{
                    statusId = this.state.statusId1;
                }
                
          
            const dui = "?form.roleId=" + roleid;
            const searchRoles = await searchUserForRole(dui);
            this.setState({
            //     currentstatusid:this.state.sonstatusid[index],
                targetFlowId:this.state.nextFlowRoleIdarr[index],
                searchRole: searchRoles.form.dataList,
                flowRoleId:this.state.nextFlowIdarr[index],
                statusId:statusId,
                ticketID:this.state.nextStatusIdarr[index]
            })
        }


    }
    aggreeall = () => {
        let arr = ["同意"];
        const aggress = this.state.aggree;
        if (aggress == 1) {

        } else {
            arr.push("不同意")
        }
        return <View style={{ flexDirection: 'row', width: '96%',
        alignItems: 'center', paddingBottom: 8, paddingRight: 8, paddingTop: 8 ,borderBottomColor:'#e9e9ef',borderStyle:'solid',borderBottomWidth:1}}>
            <Text style={{ color: '#363434',flex:1 }}>是否同意</Text>
            <ModalDropdown
                dropdownTextStyle={{ fontSize: 15 }} 
                dropdownStyle={{width:'50%',backgroundColor:'#eee',borderWidth:0,elevation:3}}
                textStyle={{ color: '#363434', fontSize: 13,}}
                style={{justifyContent: 'center', }}
                defaultValue={arr[0]}
                onSelect={(index, value) => this.changeAgree(index, 0, value)}
                options={arr} />
        </View>
    }

    getdefault(datas) {
        let s = {};
        var data = {};
        let newdata = {};
        let dataNEW = {};
        datas.map((item, i) => {
            if (item.TicketParaID.slice(item.TicketParaID.length - 2, item.TicketParaID.length) != "_1") {
                s = { [item.TicketParaID]: item.TicketParaValue };
                data = Object.assign(this.state.pagedata, s);
                let gettextarea = {};
                if(item.TicketParaID.slice(item.TicketParaID.length - 2, item.TicketParaID.length)== "*1"){
                    gettextarea={[item.TicketParaID]:true}
                }

                this.setState({
                    pagedata: data,
                    getmoretextarea:gettextarea
                });

            } else {
                newdata = { [item.TicketParaID]: item.TicketParaValue }
                dataNEW = Object.assign(this.state.newChecked, newdata);
                this.setState({
                    newChecked: dataNEW
                });
            }
        })
    }

    onChangeTextInput(v) {
        this.setState({
            detailinfo: v
        })
    }

    async submitResult() {

        let newpagedata = this.state.newpagedata==undefined?{defaultValue:1}:this.state.newpagedata;
           

        for (const key in newpagedata) {

                if (key.slice(key.length - 2, key.length)== "*1") {
                    let tt = key.slice(0,key.length - 2)+"_1";
                    let newvalues = newpagedata[key];
                    let checkvalues = newpagedata[tt];
                    let newArr = [];
                    let checkArr = [];
                    for(let i =0;i<newvalues.length;i++){
                        let newvalue = newvalues[i];
                        if(newvalue){
                            newArr.push(newvalue);
                            if(checkvalues){
                                checkArr.push(checkvalues[i]);
                            }
                        }
                    }
                    newpagedata[key]=newArr;
                    if(checkvalues){
                        newpagedata[tt]=checkArr
                    }
                    
                }
            } 
    
        if (this.state.vvval || this.state.searchRole.length < 1) {
            let data = {
                'form.basicInfoId': this.props.navigation.state.params.ticketbasicinfoid,
                'form.ticketTypeName': this.props.navigation.state.params.typeName,
                'form.targetStatusId': this.state.ticketID,
                'form.templateId': this.props.navigation.state.params.templateID,
                'form.targetFlowRoleId': this.state.targetFlowId,
                'form.userId': this.props.navigation.state.params.userId,
                'form.recordOption': this.state.agreeLiuzhuan,
                'form.detailInfo': this.state.detailinfo,
                'form.targetFlowId': this.state.flowRoleId,
                'form.targetUserId': this.state.vvval,
                "form.paraData": JSON.stringify(newpagedata),
                "form.fatherIndex":this.state.fatherIndex,
                "form.sonIndex": this.state.sonIndex,
                "form.flowroleid0":this.state.statusId1,
                "form.flowroleid": this.state.statusId,
            }
            console.log(data)
            var para = "";
        // return;
            for (var a in data) {
                para += ("&" + a + "=" + encodeURIComponent(data[a]));
            }
            para = "?" + para.substr(1, para.length);
          
            this.setState({
                loading: true
            })
            try {
                const tijiaodata = await tijiao(para)
                if(tijiaodata.form.commitInfo!==null){
                    this.setState({
                        loading: false
                    })
                    Alert.alert(
                        '提示', tijiaodata.form.commitInfo,
                        [
                            { text: '是', onPress: () => this.props.navigation.dispatch(resetAction) },
                        ],
                        { cancelable: false }
                    );
                    return false;
                }
                this.setState({
                    loading: false
                })
                Alert.alert(
                    '提示', '数据提交成功！',
                    [
                        { text: '是', onPress: () => this.props.navigation.dispatch(resetAction) },
                    ],
                    { cancelable: false }
                );
            } catch (error) {
                ToastAndroid.show('网络错误', ToastAndroid.SHORT);
                this.setState({
                    loading: false
                })
            }
        } else {
            Alert.alert("提示", "流转目标不能为空", [
                { text: '是'},
            ], { cancelable: false })
        }
    }
/****
 * 获取班组默认
 * ***/
    getDefaultMore(getAllTempanyId, ParaName) {

        let ggg = this.state.pagedata;
        let indexid = 0;
        let values = Object.values(ggg);
        let keys = Object.keys(ggg);
        keys.findIndex((item, index) => {
            if (item == getAllTempanyId) {
                indexid = index;
            }
        })
        let defat = values[indexid];//获取部门/成员id
            return defat ? defat : '请选择';
        
    }

    /***
     * 获取部门
     * ***/
    getGzryName(getAllTempanyId) {
        let users = '';
        let ggg = this.state.pagedata;
        let indexid = 0;
        let values = Object.values(ggg);

        let keys = Object.keys(ggg);
        const itemm = keys.findIndex((item, index) => {
            if (item == getAllTempanyId) {
                indexid = index;
                return true;
            } else {
                return false;
            }
        })
        let defat = values[indexid];
        this.state.chengyuanName.map(pagename => {
            if (defat == pagename.userid) {
                users = pagename.realname
            }
        })
        if (itemm != -1) {
            return users ? users : '请选择';
        } else {
            return '请选择'
        }
    }
    /***
     * 获取成员名称
     * ***/
    BackpageUseName(datalist, ids) {
        let pageUseName = [];
        this.state.chengyuanName.map(pagename => {
            pageUseName.push(pagename.realname);
        })
        return pageUseName
    }



/****
 * 动态创建的元素获取默认值
 * ** */
    getchecked(getAllTempanyId, defaltindex) {
        let ggg = this.state.pagedata;
        let indexid = 0;
        let values = Object.values(ggg);
        let keys = Object.keys(ggg);
        let gedefault = "";
        const itemm = keys.findIndex((item, index) => {
            if (item == getAllTempanyId) {
                indexid = index;
                gedefault = values[indexid];
                return true;
            } else if (item == getAllTempanyId + "*1") {
                gedefault = values[index].split(",")[defaltindex];
                return true;
            } else {
                return false;
            }
        })
        return gedefault ? gedefault : null

    }

/***
 * 增加多行输入
 * ***/
    add(v) {
    // isadd--->>是否已执行
        this.setState(({newpagedata})=>{
            if(v.IsAdd==1){
                let newChecked = this.state.newChecked;
                let nesadds = newChecked[v+"_1"]||[''];
                nesadds = nesadds.split("&$");
                nesadds.push("0");
                this.state.newChecked[v+"_1"] = nesadds.join("&$");
                this.state.newpagedata[v+"_1"] = nesadds;
            }
            
            let newpagedata2 = this.state.pagedata;
            let  newsvaa = newpagedata2[v];
            let  vaaaa = newpagedata2[v+"*1"]=="&$"?newsvaa: newpagedata2[v+"*1"];
            
            vaaaa = vaaaa?vaaaa.split("&$"):[''];
            vaaaa.push("");
           
            newpagedata2[v+"*1"] = vaaaa.join("&$");
            this.state.newpagedata[v+"*1"] = vaaaa;
            return newpagedata2;
       });



    }
    

    /**
     * 多行文本删除（删除具体行数和 是否已执行）
     * **/
    delete(v,inde){
        let pagedata = this.state.pagedata;
        let valuesmore = Object.values(pagedata);

        let varr=this.state.isadd;
        let keys = Object.keys(varr);
        let values = Object.values(varr);
        let index = keys.findIndex((item,i)=>{
            if(item==v){
                let objects = Object.assign(this.state.isadd,{[item]:values[i]-1<=1?1:values[i]-1});
                let changedate=valuesmore.splice(valuesmore.length);
                let newPageValue = Object.assign(this.state.pagedata,{[v+"*1"]:changedate});
                this.state.isadd=objects;
                this.state.showmore=false;
                this.forceUpdate();
            }
        })
    }

    // getValueByID(v,qIndex){
    //     if(!this.state.pagedata[v]){
    //         this.state.pagedata[v] = [1];
    //     }
    //     let dss = this.state.pagedata[v].split('&$');
    //     return dss[qIndex];
    // }


    /**
     * 
     *动态创建多行文本+ 是否已执行+添加删除+（有默认值和无默认值情况） 
     * ** */
    getTextareaItemByID(v,dis){
       
        let ds00 = this.state.pagedata[v.TicketParaID];
        let ds = this.state.pagedata[v.TicketParaID+"*1"]||ds00;
        let checkeds = this.state.newChecked[v.TicketParaID+"_1"];
            checkeds=checkeds!=undefined? checkeds.split("&$"):["0"];
        let newds = ds!=undefined? ds.split('&$'):[""];
       
        return newds.map((item,qIndex)=>{
            return (<View style={{backgroundColor:dis?"white":"rgba(0,0,0,.3)",borderBottomStartRadius:newds.length==qIndex+1?5:0,borderBottomEndRadius:newds.length==qIndex+1?5:0,paddingBottom:v.IsConfirm==1?0:15}} key={qIndex}>
            <View style={{flexDirection:"row",borderTopWidth:.6,borderStyle:"solid",borderTopColor:"#e9e9ef"}}>
            <View style={{width:v.IsAdd==1 && dis?newds.length==1?"100%":"89%":"100%"}}>
            <TextareaItem defaultValue={item?item:''} editable={dis} placeholder={dis?"请输入内容...":""} placeholderTextColor="#363434"
                             onChange={(e)=>{newds[qIndex] = e;
                                 this.state.pagedata[v.TicketParaID+"*1"] = newds.join("&$");
                                 this.state.newpagedata[v.TicketParaID+"*1"]=newds;}}
                                 autoHeight last={true}
                                 style={{marginLeft:7,marginTop:8,borderRadius:5,borderWidth:1,borderStyle:"solid",
                                 borderColor:'grey',paddingVertical:4,paddingHorizontal:4,padding:0,
                                 backgroundColor:'transparent',color:'#363434',maxWidth:"96%",width:'96%',borderStyle:'solid'}} />
                                </View>
                                {v.IsAdd==1&&dis&&v.ParaTypeID ==6&& <TouchableOpacity onPress={()=>{
                                this.setState(({pagedata})=>{
                                    let pagedataID = this.state.pagedata[v.TicketParaID+"*1"];
                                     pagedataID = pagedataID!=undefined ?pagedataID.split('&$'):[true];
                                    if(!pagedataID || pagedataID.length<2)return;
                                    pagedataID.splice(qIndex,1);
                                    this.state.pagedata[v.TicketParaID+"*1"] =pagedataID.join("&$"); 
                                    this.state.newpagedata[v.TicketParaID+"*1"] =pagedataID;
                                    return pagedata;
                                })
                                
                            }} style={{justifyContent:'center',width:newds.length==1?'0%':'11%',alignItems:'center',paddingTop:5}}>
                                    {newds.length>1&&<Image style={{width:25,top:1,height:25,resizeMode:Image.resizeMode.contain}} source={require('../images/delete.png')}/>}  
                            </TouchableOpacity>
                            }
                            </View>
                            {v.IsConfirm==1?<View style={{flexDirection:'row',padding:5,borderBottomStartRadius:5,borderBottomEndRadius:5,marginTop:5}}>
                                {v.IsConfirm==1?<CheckBox labelStyle={{color:'#363434'}} checkboxStyle={{width:18,height:18}}
                                                        label={'是否已执行'}
                                                        style={{backgroundColor:'rgba(255,255,255,.1)'}}
                                                        checked={checkeds[qIndex]=="1"}
                                                        onChange={(e) => dis&&this.onChangecoform(v.TicketParaID + '_1', e, qIndex)}
                                                        underlayColor={"transparent"}
                                                    >
                                    </CheckBox>:null}
                            </View>:null}
                                
                  </View>);
        })

    }

    render(){
        return(<View style={{width: '100%', height: '100%'}}>
                
                    <TicketTitle navigation={this.props.navigation} num={true} numns={true} ishistory={this.props.navigation.state.params.ishistory}
                        centerText={this.props.navigation.state.params.typeName+this.props.navigation.state.params.ticketNum}/> 

                    {this.state.loading?<View style={{alignItems:'center',top:'45%'}}>
                        <View style={{borderRadius:4,
                                    borderColor:'rgba(255,255,255,.3)',
                                    borderWidth:1,
                                    borderStyle:'solid',
                                    position:'absolute',
                                    width:100,
                                    height:80,
                                    alignItems:'center',
                                    backgroundColor:'rgba(0,0,0,.3)',
                                    paddingTop:10,
                                    zIndex:10000000000}}>
                            <ActivityIndicator color="#363434"/>
                            <Text style={{color:'#363434',fontSize:15,marginTop:15}}>数据提交中...</Text>
                        </View>
                        </View>:null}
                    {
                        this.state.mengCard&&<View style={{top:"-6%",justifyContent:'center',alignItems:'center',width:"100%",height:"100%"}}>
                        <ActivityIndicator color="#363434"/>
                        <Text style={{color:"#363434",textAlign:"center",marginTop:10,fontSize:15}}>加载中...</Text>
                        </View>}
                    <ScrollView >
                        <View style={{marginBottom:20,display:'flex'}}>
                        {
                            this.state.templateContents.map((v,i)=>{
                                let dis = this.ischacked(v.TicketParaID);
                                    
                            return <View  key={i} style={{padding:5,alignItems:'center',width:'100%'}}>
                            <View style={{
                                width:'98%',
                                backgroundColor:v.ParaTypeID!="1"?'white':'transparent',
                                paddingTop:v.ParaTypeID=='1'?0:5,
                                paddingLeft:5,
                                paddingBottom:v.ParaTypeID=='1'?0:5,
                                paddingRight:0,
                                flexDirection:'row',
                                alignItems:'center',
                                borderBottomColor:'#e9e9ef',
                                borderBottomWidth:1,
                                borderStyle:'solid',
                                borderTopStartRadius:5,
                                borderTopEndRadius:5,
                                }}>
                                <Text style={{fontSize:v.ParaTypeID=='1'?15:13,color:'#363434',left:2,width:"87%",flex:1,flexWrap:'wrap',paddingRight:4}}>{v.ParaName}</Text>
                                {v.IsAdd==1&&dis&&v.ParaTypeID ==6&& 
                         <TouchableOpacity onPress={()=>this.add(v.TicketParaID)} style={{width:'11%',height:25,justifyContent:'center',alignItems:'center'}}>
                            <Image style={{width:23,top:1,height:23,resizeMode:Image.resizeMode.contain}} source={require('../images/add.png')}/>  
                        </TouchableOpacity>}
                            </View>
                            {v.ParaTypeID == 4 ?
                                    <DropdownCheckbox open={this.openothers.bind(this)}
                                        isshow={!dis}
                                        leixin={v.TicketParaID}
                                        ParaName={v.ParaName}
                                        getDefaultValue={v.ParaName == "班组" ? false : true}
                                        defaultValue={this.getDefaultMore(v.TicketParaID, v.ParaName)}
                                        style={{ minWidth:'98%',height:50,borderBottomStartRadius:5,borderBottomEndRadius:5}}
                                        ischanges={this.state.ischanges}
                                        banzu={v.ParaName == "班组"?v.ParaName:" "}
                                        TextColor={{color:'#363434',fontSize:13,backgroundColor:dis?"white":"rgba(0,0,0,.3)"}}
                                        SelectData={v.ParaName == "班组" ? this.state.groupName : this.state.ParaId} canClick={dis} />
                                    : v.ParaTypeID == 3 ?
                                        <ModalDropdown
                                        dropdownStyle={{width:'50%',backgroundColor:'#eee',borderWidth:0,elevation:3,height:121}}
                                        disabled={!dis}
                                        dropdownTextStyle={{ fontSize: 15 }}
                                        textStyle={{color:'#363434', fontSize: 13,}}
                                        style={{backgroundColor:dis?"white":"rgba(0,0,0,.3)",borderBottomStartRadius:5,borderBottomEndRadius:5,
                                                height:50,width:'98%',justifyContent:'center',paddingLeft:6.5}} 
                                        defaultValue={this.getGzryName(v.TicketParaID)}
                                        onSelect={(e, value) => this.getSelect(e, value, v.TicketParaID)}
                                        options={this.BackpageUseName()} />
                                        : v.ParaTypeID == 2 ?
                                            <View style={{backgroundColor:dis?"white":"rgba(0,0,0,.3)",width:'98%',borderBottomStartRadius:5,borderBottomEndRadius:5,paddingBottom:v.IsConfirm == 1?0:15}}>
                                                {v.IsConfirm == 1 ? <View>
                                                    <TextInput
                                                        multiline={true}
                                                        value={this.getchecked(v.TicketParaID)}
                                                        editable={dis} placeholder={dis?"请输入内容...":""}
                                                        underlineColorAndroid="transparent"
                                                        placeholderTextColor="#f5f5f5"
                                                        onChangeText={(values) => this.handleInput(v.TicketParaID, values)}
                                                        style={{borderRadius:5,paddingHorizontal:6.5,paddingVertical:8,minWidth:'96%',padding:0,maxWidth:'96%',color:'#363434',borderWidth:1,borderColor:'grey',borderStyle:'solid',marginTop:15,marginLeft:6.5}} />
                                                    <View style={{flexDirection:'row', paddingLeft:5,borderTopColor:"#f5f5f5",borderStyle:"solid",borderTopWidth:.6,minWidth:'98%',marginTop:15,paddingTop:7}}>
                                                        <CheckBox labelStyle={{color:'#363434'}} checkboxStyle={{width:18,height:18}}
                                                            label={'是否已执行'}
                                                            style={{backgroundColor:'rgba(255,255,255,.1)'}}
                                                            checked={this.state.newChecked[v.TicketParaID+"_1"]==1}
                                                            onChange={(e) => dis && this.onChangeTextCheck(v.TicketParaID + '_1', e, dis)}
                                                            underlayColor={"transparent"}
                                                        ></CheckBox></View></View>: 
                                                        <TextInput
                                                        multiline={true}
                                                        value={this.getchecked(v.TicketParaID)}
                                                        underlineColorAndroid="transparent"
                                                        editable={dis} placeholder={dis?"请输入内容...":""}
                                                        placeholderTextColor="#363434"
                                                        onChangeText={(values) => this.handleInput(v.TicketParaID, values)}
                                                        style={{borderRadius:5,paddingVertical:8,paddingHorizontal:6.5,padding:0,minWidth:'96%',maxWidth:'96%',color:'#363434',borderWidth:1,borderColor:'grey',borderStyle:'solid',marginTop:15,marginLeft:6.5}} />}
                                            </View> : v.ParaTypeID == 5?
                                                <DatePicker
                                                    customStyles={{
                                                        dateInput: {
                                                            left:6.5,
                                                            justifyContent:'center',
                                                                borderWidth:0,
                                                            },
                                                                dateText:{
                                                                    color:'#363434'
                                                                },
                                                                placeholderText:{
                                                                    color:'#363434'
                                                                }
                                                }}  
                                                    style={{width:'98%',backgroundColor:dis?"white":"rgba(0,0,0,.3)",borderBottomStartRadius:5,borderBottomEndRadius:5}}   
                                                    date={this.getchecked(v.TicketParaID)}
                                                    mode="datetime"
                                                    format="YYYY-MM-DD HH:mm"
                                                    confirmBtnText="确定"
                                                    cancelBtnText="取消"
                                                    showIcon={dis?true:false}
                                                    disabled={!dis}
                                                    minDate={new Date(2015, 1, 1)}
                                                    placeholder={dis?"请选择时间":" "}
                                                    onDateChange={(value) => this.onChange(v.TicketParaID, value)} />
                                                : v.ParaTypeID == 6 ?
                                                    <View style={{width:"98%"}}>

                                                            {
                                                                v.IsAdd == 1 ?this.getTextareaItemByID(v,dis)
                                                                 :<View>
                                                                 <TextareaItem editable={dis}
                                                                        rows={4}
                                                                        placeholderTextColor="#363434"
                                                                        placeholder={dis?"请输入内容...":""}
                                                                        defaultValue={this.getchecked(v.TicketParaID)}
                                                                        onChangeText={(values) => this.handleInput(v.TicketParaID, values)}
                                                                        autoHeight
                                                                        style={{paddingVertical: 5,minWidth:'98%',fontSize:14,
                                                                            backgroundColor:dis?"white":"rgba(0,0,0,.3)",color:'#363434'}} />
                                                                    {v.IsConfirm == 1 && <View style={{flexDirection:'row', backgroundColor: dis?'white':"rgba(0,0,0,.3)", padding: 5 ,borderBottomStartRadius:5,borderBottomEndRadius:5}}>
                                                                <CheckBox
                                                                    labelStyle={{color:'#363434'}} checkboxStyle={{width:18,height:18}}
                                                                    label={'是否已执行'}
                                                                    style={{backgroundColor:'rgba(255,255,255,.1)'}}
                                                                    checked={this.state.newChecked[v.TicketParaID+"_1"]==1}
                                                                    onChange={(e) => dis && this.onChangeTextCheck(v.TicketParaID + '_1', e, dis)}
                                                                    underlayColor={"transparent"}
                                                                >
                                                                </CheckBox>
                                                                </View>}
                                                                </View>
                                                            }
                                                            
                                                    </View> : null}
                        </View>
                        })}
                        
                        {this.props.navigation.state.params.isqianfa&&!this.state.mengCard&&<View>
                            <View style={{width:'100%',padding:5,justifyContent:'center'}}>
                                <Text style={{color:'#363434',marginLeft:10,fontSize:15}}>提交</Text>
                            </View>
                            
                            <View style={{marginTop:5,marginBottom:20,width:'100%',alignItems:'center'}}>
                            <View style={{width:'96%',backgroundColor:'white',alignItems:'center',borderRadius:5}}>
                                {this.aggreeall()}
                                {this.getliuzhuan()}
                                {this.gotSubmit()}
                            <View style={{width:'96%',paddingBottom: 8, paddingTop: 8}}>
                                <Text style={{color:'#363434'}}>详细意见</Text>
                                <TextareaItem last={true} placeholder="请输入内容..."  placeholderTextColor="#363434" autoHeight onChangeText={(v)=>this.onChangeTextInput(v)} 
                                style={{paddingVertical: 5,fontSize:14,minWidth:'98%',backgroundColor:"#eee",color:'#363434'}}/>
                            </View>
                            </View>
                            </View> 
                            
                            <View style={{marginBottom:50,width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <TouchableOpacity 
                                            onPress={()=>this.submitResult()}
                                            style={{
                                                elevation:2,
                                                justifyContent:'center',
                                                alignItems:'center',
                                                width:'80%',
                                                backgroundColor:'#1296db',
                                                borderRadius:5,height:40}}>
                                        <Text style={{color:'white',fontSize:20}}>提交</Text>
                                </TouchableOpacity>
                            </View>
                            </View>}
                            </View>
                  </ScrollView>
                  {/* } */}
              </View>)
    }
}