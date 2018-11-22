import React from 'react';
import { InputItem, List, TextareaItem, ActivityIndicator } from 'antd-mobile-rn';
import { View, Text, ScrollView, TouchableOpacity, Picker, TextInput, Alert, ToastAndroid, Dimensions, Image } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import DropdownCheckbox from '../Component/DropdownCheckbox';
import CheckBox from 'react-native-checkbox';
import DatePicker from 'react-native-datepicker'
import TicketTitle from './TicketTitle';
import {
    TicketBasicInfo,
    searchTicketBasicInfo,
    searchTicketFlow,
    searchFlowRecord,
    searchTicketRecord,
    newTiceketNum,
    searchUserForRole,
    editquanxian,
    AllDepartment,
    AllMangerUser,
    historys,
    tijiao,
    ForDepartment
} from './../api/api'
import { StackActions, NavigationActions } from 'react-navigation';
let { width, height } = Dimensions.get('window');
const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Tab' })],
});
export default class Tdetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
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
            newpagedata: { "defaultvalue": 1 },
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
            allFlowRole:[]

        }
    }
    onBackClicked = () => {
        const { navigator } = this.props;
        if (navigator && navigator.getCurrentRoutes().length > 1) {
            navigator.pop();
            return true;//true 表示返回上一页
        }
        return false; // 默认false  表示跳出RN
    }
    async componentDidMount() {
        this.getCanNotdata();
    }

    //获取模板列表
    async getCanNotdata() {
        if (!jconfig.userinfo) return ToastAndroid.show('请登录', ToastAndroid.SHORT);
        var ticketFlowrole = [];//定义该流程所属类型的所有状态角色
        var statusId = "";//定义该流程的状态id
        var roleId = "";//定义登陆用户的角色id
        var ticketFlowList = [];//定义当前流程所有状态
        var index = 0;//定义当前状态在所有状态的下标
        var skipFlowId = "";	//获取当前流程能跳转的流程id，0为不能跳转
        var isBack = "";	//获取当前流程是否能回转，1为能回转，0为不能回转
        const { templateID, ticketNum, typeName, departmentid } = this.props.navigation.state.params;
        const geturlid = "?form.tree_node_operation=" + 0;
        const result = await historys(geturlid);
        const userId = result.form.userId;
        /**
         * 获取票编号
         * newTiceketNum
         * **/
        const ids = '?form.templateId=' + templateID;
        const TiceketNum = await newTiceketNum(ids);
        console.log(TiceketNum, "获取两票模板票id")
        this.setState({
            TiceketNum: TiceketNum.form.newTicket,
            userId: userId
        })



        let r = '?form.jqgrid_row_selected_id=' + templateID;
        let x = await TicketBasicInfo(r);//获取模板
        console.log(x, '获取模板')
        if (x.form.templateContents.length > 0) {

            this.setState({
                templateContents: x.form.templateContents
            })
        }

        //查询当前两票基本信息  
        console.log(ticketNum)
        let aas = '?form.ticketNum=' + ticketNum;
        let searchs = await searchTicketBasicInfo(aas);
        console.log(searchs, "查询当前两票基本信息 ")
        //设置流转状态及目标用户，展示流程记录

        //当前类型两票流程
        //根据类型名称查询流程状态角色并排序显示
        let data = `?form.ticketTypeName=${typeName}`;
        let liucheng = await searchTicketFlow(data);
        console.log(await searchTicketFlow(data), "当前类型两票流程===1 ")
        console.log(liucheng, "当前类型两票流程===2 ")
        // return;
        ticketFlowrole = liucheng.form.dataList;//该流程所属类型的所有状态角色
        //去除作废流程
        ticketFlowrole.map((item, i) => {
            // if (item.ticketstatusname == "作废") {
            //     ticketFlowrole.splice(i, 1);
            // }
           
            // if(item.ticketstatusname==this.props.navigation.state.params.ticketstatusname){
            //     this.setState({ticketstatusid:item.ticketstatusid})
            // }
        })
        this.setState({
            ticketFlowrole: ticketFlowrole,
            allFlowRole: liucheng.form.dataList
        })
        console.log(ticketFlowrole, "该流程所属类型的所有状态角色")
        if (searchs.form.dataList.length > 0) {//数据库中已有记录
            console.log("数据库中已有记录")
            statusId = searchs.form.dataList[0].TicketStatusID;//该流程的当前状态id
            let TicketTypeID = searchs.form.dataList[0].TicketTypeID;//该票的类型id
            var basicInfoId = searchs.form.dataList[0].TicketBasicInfoID;//TicketBasicInfoID第一条数据的信息id 
            this.setState({
                dataList: searchs.form.dataList,
                TicketTypeID: TicketTypeID,
                statusId: statusId
            })

            // 这里需要获取已经经过的流程
            const flewFrom = "?form.basicInfoId=" + basicInfoId;
            const FlowList = await searchFlowRecord(flewFrom)
            console.log(FlowList, "这里需要获取已经经过的流程 ")
            ticketFlowList = FlowList.form.dataList;//获取当前流程所有状态
            if (ticketFlowList[0].ManageTime) {
                flowRoleId = ticketFlowList[ticketFlowList.length - 1].FlowRoleID;	//按时间顺序排序，当两票完结或作废时为最后一条
            } else {
                flowRoleId = ticketFlowList[0].FlowRoleID;	//按时间顺序排序，两票未完成时处理时间为空，排在第一条
            }
            //将已填写的参数值填入页面
            const TicketRecord = await searchTicketRecord(flewFrom);
            console.log(TicketRecord, "将已填写的参数值填入页面 ")
            const list = TicketRecord.form.dataList;//获取到票数据内容，等待传入页面

            this.setState({
                listdatas: list,
                flowRoleId: flowRoleId
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
            console.log(bumen, "获取部门")
            let y = `?form.departmentId=`
            let Team = await ForDepartment(y) //根据部门id获取用户
            //获取工作负责人
            const groupnumber = await AllMangerUser()
            console.log(groupnumber, "获取工作负责人")
            const paramsItem = "?form.flowroleid=" + ticketFlowList[0].FlowRoleID;
            const saves = await editquanxian(paramsItem);//获取可编辑内容区域
            console.log(saves.form.dataList, "获取可编辑内容区域");
            this.setState({
                nnnmmm: true,
                groupName: bumen.form.dataList,
                chengyuanName: groupnumber.form.dataList,
                havChangeList: saves.form.dataList,
                ParaId: Team.form.dataList
            })

            //设置提交目标
            for (var i = 0; i < ticketFlowrole.length; i++) {
                console.log(index, ticketFlowrole.length, "======================")
                let ticketrolerank = ticketFlowrole[i].ticketrolerank;
                if (ticketFlowrole[i].FlowRoleID == flowRoleId) {
                    index = i;
                    break;
                }
                // if (ticketFlowrole[i].ticketstatusid == statusId) {
                //     index = i;
                //     console.log(111111)
                //     break;
                // }
            }
            this.setState({
                index: index
            })
            console.log(index, ticketFlowrole.length, "======================")

            if (this.props.navigation.state.params.isqianfa) {
                if (index > ticketFlowrole.length - 2) { //最后两个状态为验收和作废，均为终结流程
                    Alert.alert("提示", `${this.props.navigation.state.params.typeName}已终结！！！`);
                    this.setState({ mengCard: false })
                    return false;
                } else {
                    //设置流转状态及流转目标
                    var nextFlowId = ticketFlowrole[index + 1].ticketstatusid;//下一个流程id
                    var nextFlow = ticketFlowrole[index + 1].ticketstatusname;//下一个流程状态
                    let arr = [nextFlow];
                    this.setState({
                        nextFlowId: nextFlowId,
                        nextFlow: arr
                    })
                    var nextRoleId = ticketFlowrole[index + 1].ticketroleid;
                    const dui = "?form.roleId=" + nextRoleId;
                    const searchRole = await searchUserForRole(dui);//获取提交对象
                    console.log(searchRole, "获取提交对象")
                    this.setState({
                        searchRole: searchRole.form.dataList
                    })
                }

                skipFlowId = ticketFlowrole[index].skipflowid;
                isBack = ticketFlowrole[index].isback;

                this.setState({
                    isBack: isBack,
                    skipFlowId: skipFlowId
                })
                console.log(skipFlowId, isBack, "skipFlowId")
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
        console.log("这是最后的东西了")
        this.setState({ mengCard: false })
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
        console.log(value, "getdatas")
        let s = { [tt]: value };
        let s2 = { [tt]: value };
        let data = Object.assign(this.state.pagedata, s)
        let data1 = Object.assign(this.state.newpagedata, s2)
        this.setState({
            pagedata: data,
            newpagedata: data1
        });

    }
    onChangecoform(value, dis,index) {
        let values = Object.values(this.state.newChecked);
        let keys = Object.keys(this.state.showChecked);
        let getIndex = 0;
            keys.findIndex((item,i)=>{
                if(item==value){
                    getIndex=i;
                }
            })
           let  newval = values[getIndex].split("&$");
                newval[index] = !dis == false ? "0" : "1";

                console.log(newval, "gggggggggg");

        const listitem = { [value]:newval.join("&$")}
        const newpagedata = Object.assign(this.state.newpagedata, listitem)
        console.log(newpagedata,"ffffffffff")
        const nes = Object.assign(this.state.newChecked, listitem)
        this.setState({
            newChecked: nes,
            newpagedata: newpagedata
        });

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
        console.log(val, "vals")
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
        console.log(arrs)
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
        alljsv.findIndex((item, index) => {
            if (item != "") {
                tts.push({ [alljsitem[index]]: alljsv[index] });
            }
        })
        tts.map(item => {
            params.push(Object.keys(item)[0])
        })
        // this.state.chengyuanName.map(item=>{
        //     if(alljsitem.indexOf(item.userid) != -1){
        //         datas.push(item.userid)  
        //     }
        // })

        if (ParaName == "班组") {
            this.state.groupName.map(pagename => {
                if (alljsitem.join(",").indexOf(pagename.DepartmentID) != -1) {
                    datas.push(pagename.DepartmentID)
                }
            })

            let y = params == '' ? `?form.departmentId=` : `?form.departmentId=${params.join(",")}`
            let Team = await ForDepartment(y)
            this.setState({ ParaId: [] }, () => {
                this.state.ischanges = true;
                this.state.ParaId = Team.form.dataList;
                this.forceUpdate()
            })
        } else {
            this.state.ParaId.map(pagename => {
                if (alljsitem.join(",").indexOf(pagename.userid) != -1) {
                    datas.push(pagename.userid)
                }
            })
            this.state.ischanges = false;
            this.forceUpdate()
        }

        for (let i in val) {
            if (val[i]) {
                display.push(val[i]);
            }
        };
        let s = { [leixing]: display.join(",") };
        let ss = { [leixing]: datas };
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
        return <View style={{ width: '95%', borderBottomColor: 'rgba(0,0,0,.2)', borderBottomWidth: 1, borderStyle: 'solid',  paddingBottom: 8, paddingRight: 8, paddingTop: 8 }}>
            <Text style={{ color: '#3f4044', left:5}}>流转目标</Text>
            <DropdownCheckbox open={this.open.bind(this)}  TextColor={{ color: 'black', fontSize: 13, left: 5 }}
                style={{ backgroundColor: 'white', minWidth: '80%', height: 29.3, justifyContent: 'center' }} SelectData={this.state.searchRole} />
        </View>
    }
    getliuzhuan = () => {
        let arr = this.state.nextFlow;
        this.state.showPage.isflew = arr[0];
        return <View style={{ flexDirection: 'row', width: '95%', borderBottomColor: 'rgba(0,0,0,.2)', borderBottomWidth: 1, borderStyle: 'solid', alignItems: 'center', paddingBottom: 8, paddingRight: 8, paddingTop: 8 }}>
            <Text style={{ left: 5, color: '#3f4044' }}>流转状态</Text>
            <ModalDropdown dropdownTextStyle={{ fontSize: 15 }}
                dropdownStyle={{}}
                textStyle={{ color: 'black', fontSize: 13 }}
                style={{ width: '80%', justifyContent: 'center', left: 10 }}
                defaultValue={arr[0] ? arr[0] : "请选择"}
                onSelect={(index, value) => this.changeAgree(index, 1, value)}
                options={arr} />
        </View>

    }
    async getNewSubdeta(index, isBack, ticketFlowRole, skipFlowId) {
        //设置回转状态及回转目标
        console.log(index, isBack, ticketFlowRole, skipFlowId)

        var backFlowNameArray = [];
        var backRoleIdArray = [];
        let NewArr = [];
        if (isBack == 1) {
            for (var i = 0; i < index; i++) {
                if (ticketFlowRole[i].ticketrolerank == 1) {
                    backFlowNameArray.push(ticketFlowRole[i].ticketstatusname);
                    backRoleIdArray.push(ticketFlowRole[i].ticketroleid);

                    let itemarr = '回转-' + ticketFlowRole[i].ticketstatusname;
                    NewArr.push(itemarr)
                }
            } 
        }
  
        let allFlowRole = this.state.ticketFlowrole;
        if (skipFlowId != 0) {
            for (var i = 0; i < allFlowRole.length; i++) {
                if (allFlowRole[i].ticketflowid == skipFlowId) {
                    NewArr.push('跳转-'+allFlowRole[i].ticketstatusname) 
                    backRoleIdArray.push(ticketFlowRole[i].ticketroleid)
                };
            }
        }
        //获取提交对象
        console.log(backRoleIdArray,"???????????????????")
        const dui = "?form.roleId=" + backRoleIdArray[0];
        const searchRole = await searchUserForRole(dui);//获取提交对象
        console.log(searchRole,">>>>>>>>>>>>>>")
        this.setState({
            nextFlow: NewArr,
            searchRole: searchRole.form.dataList
        })

    }

    async getSubdata(index, ticketFlowrole) {
        if (index > ticketFlowrole.length - 2) { //最后两个状态为验收和作废，均为终结流程
            console.log(ticketFlowrole, "终结流程!")
        } else {
            //设置流转状态及流转目标
            var nextFlowId = ticketFlowrole[index + 1].ticketstatusid;//下一个流程id
            var nextFlow = ticketFlowrole[index + 1].ticketstatusname;//下一个流程状态
            let arr = [nextFlow];
            this.setState({
                nextFlowId: nextFlowId,
                nextFlow: arr
            })
            var nextRoleId = ticketFlowrole[index + 1].ticketroleid;
            const dui = "?form.roleId=" + nextRoleId;
            const searchRole = await searchUserForRole(dui);//获取提交对象
            console.log(searchRole, "获取提交对象")
            this.setState({
                searchRole: searchRole.form.dataList
            })
        }
    }
    changeAgree = async(index, flag, value) => {
        console.log(index,value, "index")
        let arr = [];
        arr.push(value)
        if (flag == 0) {
            if (index == 0) {//同意
                this.setState({ agreeLiuzhuan: 1 })
                this.getSubdata(this.state.index, this.state.ticketFlowrole)
            } else {//不同意
                this.setState({ agreeLiuzhuan: 2 })
                this.getNewSubdeta(this.state.index, this.state.isBack, this.state.ticketFlowrole, this.state.skipFlowId);//获取新的流转对象和新的提交对象
            }
        }
        
        if(flag==1){
            const ticket = this.state.allFlowRole;
            const searchRole = this.state.searchRole;
            let roleid ="";
            console.log(searchRole,ticket,"vvvvvvvvvvvvvvvvvvvvvv")
            const tt = searchRole[0].substr(3,searchRole[0].length);
            ticket.map((item,i)=>{
                console.log(item.ticketstatusname==tt,"gggggggggggg")
                if(item.ticketstatusname==tt){
                    roleid=item.ticketroleid;
                }
            })
            const dui = "?form.roleId=" + roleid;
            const searchRoles = await searchUserForRole(dui);
            this.setState({
                searchRole: searchRoles.form.dataList
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
        return <View style={{ flexDirection: 'row', width: '95%', borderBottomColor: 'rgba(0,0,0,.2)', borderBottomWidth: 1, borderStyle: 'solid', alignItems: 'center', paddingBottom: 8, paddingRight: 8, paddingTop: 8 }}>
            <Text style={{ left: 5, color: '#3f4044' }}>是否同意</Text>
            <ModalDropdown
                dropdownTextStyle={{ fontSize: 15 }} dropdownStyle={{}} textStyle={{ color: 'black', fontSize: 13, left: 5 }}
                style={{ width: '80%', justifyContent: 'center', left: 10 }}
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

        const { newpagedata } = { ...this.state };
        
        if (this.state.vvval || this.state.searchRole.length < 1) {
            let data = {
                'form.basicInfoId': this.props.navigation.state.params.ticketbasicinfoid,
                'form.ticketTypeName': this.props.navigation.state.params.typeName,
                'form.ticketStatusId': this.state.statusId,
                'form.ticketNum': this.props.navigation.state.params.ticketNum,
                'form.templateId': this.props.navigation.state.params.templateID,
                'form.flowroleid': this.state.flowRoleId,
                'form.userId': this.props.navigation.state.params.userId,
                'form.recordOption': this.state.agreeLiuzhuan,
                'form.detailInfo': this.state.detailinfo,
                'form.nextFlowId': this.state.nextFlowId,
                'form.nextUserId': this.state.vvval,
                "form.paraData": JSON.stringify(newpagedata)
            }
            console.log(data, "111111111111111111")
            var para = "";
            for (var a in data) {
                para += ("&" + a + "=" + encodeURIComponent(data[a]));
            }
            para = "?" + para.substr(1, para.length);
            console.log(para, "gggggggggggg")
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
                ToastAndroid.show('数据填写错误', ToastAndroid.SHORT);
                this.setState({
                    loading: false
                })
            }
        } else {
            Alert.alert("提示", "流转目标不能为空")
        }
    }

    getDefaultMore(getAllTempanyId, ParaName) {

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
        let defat = values[indexid];//获取部门/成员id

        if (itemm != -1) {
            return defat ? defat : '请选择';
        } else {
            return '请选择'
        }
    }
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
    BackpageUseName(datalist, ids) {
        let pageUseName = [];
        this.state.chengyuanName.map(pagename => {
            pageUseName.push(pagename.realname);
        })
        return pageUseName
    }


    getddds = (ddd, indexss) => {
        let sdate = this.state.newChecked;
       
        if (JSON.stringify(sdate)!="{}") {
            let tt = 0;
            let keys = Object.keys(sdate);
            let values = Object.values(sdate);
           
             keys.findIndex((item, i) => {
                if (ddd == item) {
                    tt = i;
                    return 1
                } else {
                    return 0
                }
            })
            let newvalue = values[tt].split('&$');
            return newvalue[indexss] == 1 ? true : false;
        } else {
            return false;
        }
    }

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
                gedefault = values[index].split("&$")[defaltindex];
                return true;
            } else {
                return false;
            }
        })
        return gedefault ? gedefault : null

    }


    add(v) {
        let varr = this.state.isadd;
        let keys = Object.keys(varr);
        let values = Object.values(varr);

        let index = keys.findIndex((item, i) => {
            if (item == v) {
                console.log(varr, "555555555")
                itemsss = values[i + 1] + 1;
                let objects = Object.assign(this.state.isadd, { [item]: values[i] + 1 })
                this.state.isadd = objects;
                this.state.showmore = false;
                this.forceUpdate();
            }
        })
    }
    isnums(v) {

        let ggg = this.state.pagedata;
        let getarea = this.state.getmoretextarea;
        if(JSON.stringify(ggg)=="{}")return "";
        
        let getareaValue = Object.values(getarea);
        let getareakeys  = Object.keys(getarea);
        let gettrues = false;
        getareakeys.findIndex((keyItem,index)=>{
            
            if(keyItem == v+"*1"){
                gettrues= getareaValue[index];
                return ;
            }
        })
        let values00 = Object.values(ggg);
        let keys00 = Object.keys(ggg);

        let textmore = "";
        let varr = this.state.isadd;
        let keys = Object.keys(varr);
        let values = Object.values(varr);
        let ss = 0;
      
        keys00.findIndex((item, index) => {
            if (item.substr(item.length - 2, item.length) == "*1" && gettrues) {
                textmore = values00[index];
                textmore = textmore.split("&$").length;
                let objects = Object.assign(this.state.isadd, { [v]: textmore })
                this.state.isadd = objects;
                let getores = Object.assign(this.state.getmoretextarea,{[v+"*1"]:false})
                this.state.getmoretextarea = getores;
                this.forceUpdate();
            } else if (item == v) {
                indexid = index;
                return true;
            } else {
                return false;
            }
        })

        let index = keys.findIndex((item, i) => {
            if (item == v) {
                ss = i
            }
        })

        return textmore != "" ? textmore : values[ss]

    }
    delete(v){

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

    handleInputmore( v,three,index){
        let datamores = this.state.datamore;
        let moredata = Object.values(datamores)
        let moredatakeys = Object.keys(datamores)
        
        let rt = {[v+index]:three}
        let getarrs = [];
        moredatakeys.findIndex((items,index)=>{
            if(v==items.substring(0,items.length-1)){
                getarrs.push(moredata[index])
            }
        })
        let s ={[v]:getarrs.join("&$")};
        // let data = Object.assign(this.state.pagedata,s)
        let datamore = Object.assign(this.state.datamore,rt)

        let datas = Object.assign(this.state.newpagedata,{[v+"*1"]:getarrs})
        console.log(datas,"ddddddddddddd")
        this.setState({
            // pagedata: data,
            newpagedata:datas,
            datamore:datamore
        });
    }


    render(){
        return(<View style={{justifyContent:'center'}}>
                    <TicketTitle navigation={this.props.navigation} num={true} numns={true} ishistory={this.props.navigation.state.params.ishistory}
                        centerText={this.props.navigation.state.params.typeName}/>    
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
                        <ActivityIndicator color="#00bbf0"/>
                        <Text style={{color:'white',fontSize:15,marginTop:15}}>数据提交中...</Text>
                    </View>
                    </View>:null}
                    {this.state.mengCard&&<View 
                    style={{display:"flex",flexDirection:"column",zIndex:444,
                    width:width,height:height-60,backgroundColor:"lightgray"}}>
                        <View style={{marginTop:"55%",marginBottom:"50%"}}>
                            <ActivityIndicator color="#03c1eb"/>
                            <Text style={{color:"#007aff",textAlign:"center",marginTop:10,fontSize:15}}>加载中...</Text>
                        </View>
                    </View>}
                    <ScrollView style={{display:'flex'}}>
                        <View style={{marginBottom:20}}>
                        {
                            this.state.templateContents.map((v,i)=>{
                                let dis = this.ischacked(v.TicketParaID);
                                
                            return <View  key={i} style={{marginTop:5,padding:5,alignItems:'center',width:'100%'}}>
                            <View style={{
                                width:'98%',
                                backgroundColor:'white',
                                padding:5,
                                flexDirection:'row',
                                borderBottomWidth:1,
                                borderBottomColor:'rgba(0,0,0,.2)',
                                borderStyle:'solid',
                                alignItems:'center',
                                }}>
                                <Text style={{color:'#3f4044',left:2}}>{v.ParaName}</Text>
                                {v.IsAdd==1&&dis&& <View style={{flexDirection:'row',left:5}}>
                         <TouchableOpacity onPress={()=>this.add(v.TicketParaID)}>
                            <Image resizeMode="contain" style={{width:20,top:1,height:20}} source={require('../images/add.png')}/>  
                        </TouchableOpacity>
                        {/* <TouchableOpacity onPress={()=>this.delete(v.TicketParaID)}>
                            <Image resizeMode="contain" style={{width:20}} source={require('../images/delete.png')}/>
                        </TouchableOpacity> */}
                    </View>}
                            </View>
                            {v.ParaTypeID == 4 ?
                                    <DropdownCheckbox open={this.openothers.bind(this)}
                                        isshow={!dis}
                                        leixin={v.TicketParaID}
                                        ParaName={v.ParaName}
                                        getDefaultValue={v.ParaName == "班组" ? false : true}
                                        defaultValue={this.getDefaultMore(v.TicketParaID, v.ParaName)}
                                        style={{ minWidth: '98%' }}
                                        ischanges={this.state.ischanges}
                                        TextColor={{ color: 'black', fontSize: 13, backgroundColor: dis ? "white" : "lightgray" }}
                                        SelectData={v.ParaName == "班组" ? this.state.groupName : this.state.ParaId} canClick={dis} />
                                    : v.ParaTypeID == 3 ?
                                        <ModalDropdown
                                            disabled={!dis}
                                            dropdownTextStyle={{ fontSize: 15 }}
                                            textStyle={{ color: 'black', fontSize: 13, left: 5 }}
                                            style={{
                                                backgroundColor: dis ? "white" : "lightgray",
                                                height: 29.3, width: '98%', justifyContent: 'center'
                                            }}
                                            defaultValue={this.getGzryName(v.TicketParaID)}
                                            onSelect={(e, value) => this.getSelect(e, value, v.TicketParaID)}
                                            options={this.BackpageUseName()} />
                                        : v.ParaTypeID == 2 ?
                                            <View>
                                                {v.IsConfirm == 1 ? <View style={{ flexDirection: 'column', margin: 5 }}>
                                                    <TextInput
                                                        value={this.getchecked(v.TicketParaID)}
                                                        editable={dis} placeholder="请输入内容..."
                                                        underlineColorAndroid="transparent"
                                                        onChangeText={(values) => this.handleInput(v.TicketParaID, values)}
                                                        style={{ minWidth: '98%', backgroundColor: dis ? "white" : "lightgray" }} />
                                                    <View style={{ flexDirection: 'row', margin: 5 }}>
                                                        <CheckBox
                                                            label={'是否已执行'}
                                                            checked={this.getddds(v.TicketParaID + '_1')}
                                                            onChange={(e) => dis && this.onChangecoform(v.TicketParaID + '_1', e, dis)}
                                                            underlayColor={"transparent"}
                                                        ></CheckBox></View></View> : <TextInput
                                                        value={this.getchecked(v.TicketParaID)}
                                                        underlineColorAndroid="transparent"
                                                        editable={dis} placeholder="请输入内容..."
                                                        onChangeText={(values) => this.handleInput(v.TicketParaID, values)}
                                                        style={{ minWidth: '98%', backgroundColor: dis ? "white" : "lightgray" }} />}
                                            </View> : v.ParaTypeID == 5
                                                ?
                                                <DatePicker
                                                    style={{ width: '98%', backgroundColor: dis ? "white" : "lightgray" }}
                                                    date={this.getchecked(v.TicketParaID)}
                                                    mode="datetime"
                                                    format="YYYY-MM-DD HH:mm"
                                                    confirmBtnText="确定"
                                                    cancelBtnText="取消"
                                                    showIcon={true}
                                                    disabled={!dis}
                                                    minDate={new Date(2015, 1, 1)}
                                                    placeholder="请选择时间"
                                                    onDateChange={(value) => this.onChange(v.TicketParaID, value)} />
                                                : v.ParaTypeID == 6 ?
                                                    <View>
                                                        <View>

                                                            {
                                                                v.IsAdd == 1 ?
                                                                    new Array(this.isnums(v.TicketParaID)).fill(7).map((item, index) => {
                                                                    return (
                                                                   <View key={index}>     
                                                                    <TextareaItem  editable={dis}
                                                                        rows={4}
                                                                        placeholder="请输入内容..."
                                                                        defaultValue={this.getchecked(v.TicketParaID, index)}
                                                                        onChangeText={(values) => this.handleInputmore(v.TicketParaID, values, index)}
                                                                        autoHeight
                                                                        style={{ borderTopColor:'gray',borderTopWidth:1,borderStyle:'solid',paddingVertical: 5, minWidth: '98%', backgroundColor: dis ? "white" : "lightgray" }}
                                                                    />
                                                                    {v.IsConfirm == 1 && <View style={{ borderTopColor:'gray',borderTopWidth:1,borderStyle:'solid',flexDirection: 'row', backgroundColor:dis ? "white" : "lightgray" , padding: 5 }}>
                                                                <CheckBox
                                                                    label={'是否已执行'}
                                                                    checked={this.getddds(v.TicketParaID + '_1', index)}
                                                                    onChange={(e) => dis && this.onChangecoform(v.TicketParaID + '_1', e, index)}
                                                                    underlayColor={"transparent"}
                                                                >
                                                                </CheckBox></View>}
                                                                    </View>)
                                                                }) :
                                                                    <TextareaItem editable={dis}
                                                                        rows={4}
                                                                        placeholder="请输入内容..."
                                                                        defaultValue={this.getchecked(v.TicketParaID)}
                                                                        onChangeText={(values) => this.handleInput(v.TicketParaID, values)}
                                                                        autoHeight
                                                                        style={{ paddingVertical: 5, minWidth: '98%', backgroundColor: dis ? "white" : "lightgray" }} />
                                                            }
                                                            {v.IsConfirm == 1 && <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 5 }}>
                                                                {/* <CheckBox
                                                                    label={'是否已执行'}
                                                                    checked={this.getddds(v.TicketParaID + '_1')}
                                                                    onChange={(e) => dis && this.onChangecoform(v.TicketParaID + '_1', e, dis)}
                                                                    underlayColor={"transparent"}
                                                                >
                                                                </CheckBox> */}
                                                                </View>}
                                                        </View>
                                                    </View> : null}
                        </View>
                        })}
                        
                        {this.props.navigation.state.params.isqianfa&&<View>
                            <View style={{width:'100%',padding:5,justifyContent:'center'}}>
                                <Text style={{color:'#3f4044',left:5}}>提交</Text>
                            </View>
                            
                            <View style={{marginTop:5,marginBottom:20,width:'100%',alignItems:'center'}}>
                            <View style={{width:'96%',elevation:3,backgroundColor:'white',alignItems:'center'}}>
                            {this.aggreeall()}
                            {this.getliuzhuan()}
                            {this.gotSubmit()}
                           
                            <View style={{width:'96%',borderBottomColor:'rgba(0,0,0,.2)',borderBottomWidth:1,borderStyle:'solid',padding:8}}>
                                <Text style={{color:'#3f4044'}}>详细意见</Text>
                                <TextareaItem placeholder="请输入内容..." autoHeight onChangeText={(v)=>this.onChangeTextInput(v)} style={{minWidth:'95%'}}/>
                            </View>
                            </View>
                            {/* <Text style={{color:'#3f4044'}}>详细意见</Text>
                            <TextareaItem   onChangeText={(v)=>this.onChangeTextInput(v)} 
                                            autoHeight 
                                            rows={4}
                                            placeholder="请输入内容..."
                                            style={{ paddingVertical: 5,
                                                     borderBottomWidth:2,
                                                     backgroundColor:"#fffeee" }}/> */}
                            
                            </View> 
                            
                            <View style={{marginBottom:50,width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <TouchableOpacity 
                                            onPress={()=>this.submitResult()}
                                            style={{
                                                elevation:2,
                                                justifyContent:'center',
                                                alignItems:'center',
                                                width:'80%',
                                                backgroundColor:'#4c70b9',
                                                borderRadius:5,height:40}}>
                                        <Text style={{color:'white',fontSize:20}}>提交</Text>
                                </TouchableOpacity>
                            </View>
                            </View>}
                            </View>
                  </ScrollView>
              </View>)
    }
}