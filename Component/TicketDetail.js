import React from 'react';
import TicketTitle from './TicketTitle';
import {TextareaItem,ActivityIndicator} from 'antd-mobile-rn';
import {View,Text,ScrollView,TouchableOpacity,TextInput,ToastAndroid,Alert,Image} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import DatePicker from 'react-native-datepicker'
// import {newTiceketNum,TicketBasicInfo,searchTicketFlow,editquanxian,searchUserForRole,searchTicketRecord,tijiao,historys,userlist,AllMangerUser,AllDepartment,ForDepartment} from './../api/api';
import HttpUtils from '../api/Httpdata3';
import TicketDropdownCheckBox from './TicketDropdownCheckBox';
import CheckBox from 'react-native-checkbox';
import Modals from './Model'
import {StackActions, NavigationActions} from 'react-navigation';
const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Tab' })],
    });
export default class Tdetail extends React.Component{
    constructor(props){
        super(props)
        this.state={
            http:jconfig.netWorkIp?jconfig.netWorkIp:'http://59.172.204.182:8030/ttms',
            newsz:[],
            ParaId:[],
            AllManger:[],
            Department:[],
            vvval:'',
            isgzfzr:'',
            value:null,
            num:'',
            jax:[],
            zed:[],
            ContentID:'',
            rolecontentid:'',
            index:'',
            user:[],
            status:'',
            find:[],
            showChecked:{},
            language:'',
            visible:false,
            listdata:[],
            newpagedata:{},
            pagedata:{},//输入框
            statuss:'',
            stateTr:1,
            detailInfo:'',
            roleid:'',
            flowroleid:'',
            userId:'',
            itemsss:[],
            group:[],
            userData:[],
            basicInfoId:"",
            getAllTempanyId:[],
            ischanges:false,
            loading:false,
            jcnum:1,
            isadd:{},
            additem:{},
            datamore:{},
            arrs:[],
            more:'',
        }
    }

    async componentDidMount(){
        try{
        this.getData()
        }catch(e){
            
        }
    }
    
    loading(){
    if(this.state.num!=''){
            setTimeout(()=>ToastAndroid.show("加载完毕", ToastAndroid.SHORT))
    } 
    }

    componentWillUnmount = () => {
    this.setState = (state,callback)=>{
        return;
    };
    }


    async getData(){
    let e = this.props.navigation.state.params.name;
    let r = `?form.templateId=${e}`;
    let x = await HttpUtils.AjaxData(`${this.state.http}/ticketMng/ticketMng_newTiceketNum.action`,r)  //newTiceketNum(r);


    // let j = x.form.newTicket;
    // let a = `?form.ticketNum=${j}`;
    // let g = await searchTicketBasicInfo(a);
    // let ggs= `?form.basicInfoId=null`
    // let ssgg= await HttpUtils.AjaxData(`${this.state.http}/ticketMng/ticketMng_searchTicketRecord.action`,ggs) //searchTicketRecord(ggs)

    let opt = `?form.tree_node_operation=0`;
    let userId = await HttpUtils.AjaxData(`${this.state.http}/ticketMng/ticketMng_loadGrid.action`,opt) //historys(opt);
    let list = await HttpUtils.AjaxData(`${this.state.http}/home/home_showUserDatas.action`,'') //userlist();
    let kjl = `?form.jqgrid_row_selected_id=${e}`;
    let bool = await HttpUtils.AjaxData(`${this.state.http}/baseInformation/templateMng_templateContentSearch.action`,kjl)  //TicketBasicInfo(kjl);

    let i = this.props.navigation.state.params.v;
    let ghr = `?form.ticketTypeName=${i}`;
    let good = await HttpUtils.AjaxData(`${this.state.http}/ticketMng/ticketMng_searchTicketFlow.action`,ghr) //searchTicketFlow(ghr);

    let black = `?form.flowroleid=${good.form.fatherList[0].FlowRoleID}`;
    let feel = await HttpUtils.AjaxData(`${this.state.http}/ticketMng/ticketMng_searchEditPara.action`,black) //editquanxian(black);

    let fate = `?form.roleId=${good.form.fatherList[1].ticketroleid}`;
    let zero = await HttpUtils.AjaxData(`${this.state.http}/ticketMng/ticketMng_searchUserForRole.action`,fate)  //searchUserForRole(fate);

    let aa = [];
    let kobe = zero.form.dataList;

    let AllManger = await HttpUtils.AjaxData(`${this.state.http}/ticketMng/ticketMng_searchAllMangerUser.action`,'') //AllMangerUser();
    let Department = await HttpUtils.AjaxData(`${this.state.http}/ticketMng/ticketMng_searchAllDepartment.action`,'') //AllDepartment();
    let y = `?form.departmentId=`
    let Team =await HttpUtils.AjaxData(`${this.state.http}/ticketMng/ticketMng_searchUserForDepartment.action`,y) // ForDepartment(y)
    for(let j in kobe){
            let bryent = kobe[j].realname;
            aa.push(bryent);
        }
        let aaa=[];
        let getAllTempanyId = [];
        let aas=[];
        let c =[];
        bool.form.templateContents.findIndex((v11)=>{
        feel.form.dataList.findIndex((v22)=>{
                if(v11.TemplateContentID==v22.TemplateContentID){
                c.push(v11)
                }
            })
        })
        c.map((item,i)=>{
        let idss = item.TicketParaID;
        getAllTempanyId.push(idss)
        let dd={["datalist"+i]:null};
            aaa=Object.assign(this.state.pagedata,dd)
            if(item.IsAdd==1){
                aas=Object.assign(this.state.isadd,{[item.TicketParaID]:1});
        }
        })

        this.setState({pagedata:aaa,getAllTempanyId:getAllTempanyId,isadd:aas})
        let kl = [];
        let google = good.form.fatherList[1].ticketstatusname;
        kl.push(google)
        let tt;
        feel.form.dataList.map(item=>{
                tt = Object.assign(this.state.newpagedata,{[item.TicketParaID]:item.ParaName=='班组'|| item.ParaName=='班组成员'?null:''});
            })
    this.setState({
        ParaId:Team.form.dataList,
        AllManger:AllManger.form.dataList,
        Department:Department.form.dataList,
        userId:userId.form.userId,
        user:zero.form.dataList,
        monst:good.form.fatherList[1].ticketroleid,
        statuss:good.form.fatherList[1].ticketstatusid,
        roleid:good.form.fatherList[1].ticketflowid,
        status:kl,
        more:good.form.fatherList[1].FlowRoleID,
        basicInfoId:good.form.fatherList[0].FlowRoleID,
        flowroleid:bool.form.templateContents[1].FlowRoleID,
        num:x.form.newTicket,
        jax:bool.form.templateContents,
        zed:feel.form.dataList,
        newpagedata:tt,
        newsz:c
    })
    this.loading();
    this.pipei(list.form.paramAllList);
    this.xunahn(this.state.jax,this.state.zed);
    this.getlls(bool.form.templateContents);
    }
      
    getlls(data){
    let datas = [];
        data.map((v,i)=>{
        datas.push(v.TemplateContentID);
        
    })
    this.setState({
        listdata:datas
    })
    }

    
    pipei(sss){
    let s = sss;
    let itemsss= [];
    
    let index = s.findIndex((item)=>{
        if(item.userid == this.state.userId){
            itemsss.push(item);
            this.setState({
                    itemsss:itemsss
            })
        }
    });
    }


    xunahn(sss,kkk){
    let s = sss;
    let g = kkk;
    for(let i in s){
        for(let c in g){
            if(this.state.ContentID===this.state.rolecontentid){
            this.state.ContentID = g[c].TicketParaID,
            this.state.rolecontentid = s[i].TicketParaID
            }
        }
      }
     this.forceUpdate();
    }

    open(val){
        //修改选中传值问题
        let sss= Object.keys(val);
        let rrr= Object.values(val);
        let arrs =[];
        for (let index = 0; index < rrr.length; index++) {
           if(rrr[index]!=""){
            arrs.push(sss[index]);
           }
        }
        this.setState({
            vvval:arrs.join(",")
        })
    }

    async openothers(val,leixing,banzu){
        let display = [];
        let datas=[];
        let alljsitem = Object.keys(val);
        let alljsv = Object.values(val);
        let newarrs =[];
        let tts=[];
        let params=[];
        let tindex = alljsv.findIndex((item,index)=>{
            if(item!=""){
                tts.push({[alljsitem[index]]:alljsv[index]});
                newarrs.push(alljsitem[index]);
            }
        })
        tts.map(item=>{
            params.push(Object.keys(item)[0])
        })
       
       

        let alljsi = params.join(",");
        for(let i in val){
            if(val[i]){
                display.push(val[i]);
            }
        };
        let s ={[leixing]:display.join(",")};
        if(banzu=="班组"){
            this.state.Department.map(item=>{
                if(alljsitem.indexOf(item.DepartmentID) != -1){
                    datas.push(item.DepartmentID)  
                }
            })
        let y = alljsi==''? `?form.departmentId=`:`?form.departmentId=${alljsi}`
        let Team =await HttpUtils.AjaxData(`${this.state.http}/ticketMng/ticketMng_searchUserForDepartment.action`,y) //ForDepartment(y)
        this.setState({ParaId:[]},()=>{
            this.state.ischanges=true;
            this.state.ParaId=Team.form.dataList;
            this.forceUpdate()
        })
    }else{
        this.state.ischanges=false;
        this.state.ParaId.map(pagename=>{
            if(alljsitem.join(",").indexOf(pagename.userid) != -1){
                datas.push(pagename.userid)  
            }
        })
        this.forceUpdate()
    }
        let ss ={[leixing]:newarrs};
        let data = Object.assign(this.state.pagedata,s)
        let data1 = Object.assign(this.state.newpagedata,ss)
        this.state.pagedata= data;
        this.state.newpagedata=data1;
        this.forceUpdate()
    }

    formatDateTime(theDate) {

        var _hour = theDate.getHours();
        
        var _minute = theDate.getMinutes();
        
        var _second = theDate.getSeconds();
        
        var _year = theDate.getFullYear()
        
        var _month = theDate.getMonth();
        
        var _date = theDate.getDate();
        
        if(_hour<10){_hour="0"+_hour ;}
        
        if(_minute<10){_minute="0"+_minute;  }
        
        if(_second<10){_second="0"+_second  }
        
        _month = _month + 1;
        
        if(_month < 10){_month = "0" + _month;}
        
        if(_date<10){_date="0"+_date  }
        
        return  _year + "-" + _month + "-" + _date + " " + _hour + ":" + _minute;
        
        }

    onChange(tt,value,getAllTempanyId){
        let s ={[tt]:value};
        let s2 ={[getAllTempanyId]:value};
        let data = Object.assign(this.state.pagedata,s);
        let data1 = Object.assign(this.state.newpagedata,s2);
        this.setState({
            pagedata:data,
            newpagedata:data1
        });
    }


    onChangecoform(value,dis,index){
        let s = this.state.newpagedata[value];
        if(!s)s = [];
        s[index] = dis?"1":"0";
        this.state.newpagedata[value] = s;
        this.state.showChecked=s;
        this.setState(this.state);
    }

    handleInput(k, v,three){
        let s ={[k]:v};
        let rt = {[three]:v}
        let data = Object.assign(this.state.pagedata,s)
        let datas = Object.assign(this.state.newpagedata,rt)
        this.setState({
            pagedata: data,
            newpagedata:datas
        });
    }

    handleInputmore(k, v,three,index){
        let datamores = this.state.datamore;
        let moredata = Object.values(datamores);
        let moredatakeys = Object.keys(datamores);
        let s ={[k]:v};
        let getarrs = [];
        moredatakeys.findIndex((items,index)=>{
            if(three==items.substring(0,items.length-1)){
                getarrs.push(moredata[index])
            }
        })
        let rt = {[three+index]:v}
        let data = Object.assign(this.state.pagedata,s)
        let datamore = Object.assign(this.state.datamore,rt)
        

        let datas = Object.assign(this.state.newpagedata,{[three+"*1"]:getarrs})
        
        this.setState({
            pagedata: data,
            newpagedata:datas,
            datamore:datamore
        });
    }

    isChacked=(ss)=>{
        let sss = this.state.pagedata;
        
        let aa = Object.values(sss);
             return aa;
    }
   
    handleInputs(k, v){
        this.setState({
           [k]:v
        });
    }

    chackSSSS=(asd)=>{
        let sss = this.state.zed;
        let index = sss.findIndex((v)=>{
            return v.TicketParaID == asd;
        });
        return index==-1;
    }
    
    BackpageUseName(){
        let pageUseName=[];
        this.state.AllManger.map(pagename=>{
            pageUseName.push(pagename.realname);//loginname登录名  realname权限名
        })
        return pageUseName
    }
 
   async submitAll(){
    const {newpagedata} = {...this.state};
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

    if (this.state.vvval.length<2) {
        Alert.alert("流转目标不能为空！")
    } else {
    let data = {
            "form.basicInfoId": 0,
            "form.ticketTypeName":this.props.navigation.state.params.v,
            "form.templateId": this.props.navigation.state.params.name,
            "form.paraData": JSON.stringify(newpagedata),
            "form.flowroleid": this.state.basicInfoId,
            "form.flowroleid0":this.state.basicInfoId,
            "form.userId":jconfig.userinfo.user,
            "form.recordOption": this.state.stateTr,
            "form.detailInfo": this.state.detailInfo,
            "form.targetFlowId": this.state.roleid,
            "form.targetUserId":this.state.vvval,
            "form.targetStatusId": this.state.statuss,
            "form.targetFlowRoleId":this.state.more,
            "form.fatherIndex":0,
            "form.sonIndex": -1
        }
        var para = "";
        for(var a in data){
        para +=("&"+a+"="+encodeURIComponent(data[a]));
        }
        para ='?'+para.substr(1,para.length);
        try{
            let all = await HttpUtils.AjaxData(`${this.state.http}/ticketMng/ticketMng_ticketCommit.action`,para) //tijiao(para);
            if(all.form.paraData.length>2){
            Alert.alert(
                '提示',`${this.props.navigation.state.params.v}创建成功！`,
                [
                 {text:'是',onPress:()=>this.props.navigation.dispatch(resetAction)},
                ],
                { cancelable: false }
            );
        }
        }catch(e){
           ToastAndroid.show('网络或服务器出错，请重试',ToastAndroid.SHORT)
           return
        }
    }
    }

    getSelect(value,datalist,getAllTempanyId){
        let s ={[datalist]:value};
        let kk = "";
        this.state.AllManger.map(pagename=>{
            if(value==pagename.realname){
                kk=pagename.userid
            }
        })
        let gh = {[getAllTempanyId]:kk}
        let fj = Object.assign(this.state.newpagedata,gh)
        let data = Object.assign(this.state.pagedata,s)
        this.state.pagedata=data;
        this.state.newpagedata=fj;
        this.state.isgzfzr=value;
        this.forceUpdate()
    }
    
    sssgo(index){
        if (index==0) {
            this.setState({
                stateTr:1
            })
        } else {
            this.setState({
                stateTr:2
            })
        }
    }

    add(v){
         this.setState(({newpagedata})=>{
            let newpagedata2 = this.state.newpagedata;
            let vaaaa = newpagedata2[v+"*1"];
            let nesadds = newpagedata2[v+"_1"]||[0];
            vaaaa.push("");
            nesadds.push(0);
            newpagedata2[v+"*1"] = vaaaa;
            this.state.newpagedata[v+"_1"] = nesadds;
            return newpagedata2;
       });
    }

    isnums(v){
        let varr=this.state.isadd;
        let keys = Object.keys(varr);
        let values = Object.values(varr);
        let ss =0;
        let index = keys.findIndex((item,i)=>{
            if(item==v){
                ss=i
            }
        })
        return values[ss];  
    }

    delete(v,inde){
        this.setState(({isadd,newpagedata})=>{
            let vAdd = isadd[v];
            let vNewpagedata = newpagedata[v+"*1"];
            if(!vNewpagedata){
                return {};
            };
            newpagedata[v+"*1"] = vNewpagedata.splice(inde,1);
            isadd = vAdd-1;
            return{isadd,newpagedata}
        });
    }

    getValueByID(v,qIndex){
        if(!this.state.newpagedata[v]){
            this.state.newpagedata[v] = [""];
        }
        return this.state.newpagedata[v][qIndex];
    }

    gets(v,s,datalist){
        let ss ={[datalist]:v.realname};
        let gh = {[s]:v.userid}
        let fj = Object.assign(this.state.newpagedata,gh)
        let data = Object.assign(this.state.pagedata,ss)
        this.state.pagedata=data;
        this.state.newpagedata=fj;
        this.state.isgzfzr=v.realname;
        this.forceUpdate()
     }

    testBlur(){
        this.refs.inputWR.blur();
    }
    
    getTextareaItemByID(v,i){
        let ds = this.state.newpagedata[v.TicketParaID+"*1"] || [""];
        let checkeds = this.state.newpagedata[v.TicketParaID+"_1"]||["0"];
        let newpagedataID = this.state.newpagedata[v.TicketParaID+"*1"];
        return ds.map((item,qIndex)=>{
            return (<View style={{alignItems:'center',flexDirection:'row',backgroundColor:"white",width:'96%',marginLeft:15,borderBottomColor:'#ccc',borderTopColor:"#ccc",borderTopWidth:this.state.newsz.length==i+1?ds.length==qIndex+1?0:1:0,borderBottomWidth:ds.length==qIndex+1?this.state.newsz.length==i+1?0:1:0,borderStyle:'solid'}} key={qIndex}>
            {v.IsConfirm==1&&<View style={{padding:10}}>
                 <CheckBox labelStyle={{color:'#363434'}} checkboxStyle={{width:18,height:18}}
                  style={{backgroundColor:'rgba(255,255,255,.1)'}} label={''}
                  onChange={(e)=>this.onChangecoform(v.TicketParaID+"_1",e,qIndex)}>
                  </CheckBox></View>}
                <View style={{flex:1}}>
                <TextareaItem autoHeight last={true} value={this.getValueByID(v.TicketParaID+"*1",qIndex)} placeholder={"请输入"} placeholderTextColor="#666"
                              onChange={(e)=>{this.state.newpagedata[v.TicketParaID+"*1"][qIndex] = e
                              this.setState(this.state)}}
                              style={{paddingVertical:10,paddingHorizontal:0,color:'#666',fontSize:14,borderBottomColor:'#ccc',borderBottomWidth:ds.length==qIndex+1?0:1,borderStyle:'solid',height:44}} />
                </View>
                {v.IsAdd==1&&<TouchableOpacity onPress={()=>{
                                this.setState(({newpagedata})=>{
                                    let newpagedataID = this.state.newpagedata[v.TicketParaID+"*1"];
                                    let newpagedataChecked = this.state.newpagedata[v.TicketParaID+"_1"];                          
                                    if(!newpagedataID || newpagedataID.length<2)return;
                                    newpagedataID.splice(qIndex,1);
                                    if(newpagedataChecked.length)newpagedataChecked.splice(qIndex,1);
                                    this.state.newpagedata[v.TicketParaID+"*1"]=newpagedataID;
                                    this.state.newpagedata[v.TicketParaID+"_1"]=newpagedataChecked;
                                    return newpagedata
                                })
                            }} style={{justifyContent:'center',alignItems:'center',padding:!newpagedataID || newpagedataID.length<2?0:10}}>
                            {!newpagedataID || newpagedataID.length<2?null:
                            <Image style={{width:23,top:1,height:23,resizeMode:Image.resizeMode.contain}} source={require('../images/delete.png')}/>
                            }
                </TouchableOpacity>}
            </View>)
        })
    }

    MoreCheck(v,TempanyId){
      return (<View style={{marginRight:10,flexDirection:'row',alignItems:'center',maxWidth:'60%'}}>
              <TicketDropdownCheckBox open={this.openothers.bind(this)} 
                style={{flexWrap:'wrap',height:44,paddingLeft:6}} 
                ischanges={this.state.ischanges}
                TextColor={{color:'#666',fontSize:13}}
                SelectData={v.ParaName=="班组"?this.state.Department:this.state.ParaId} 
                banzu={v.ParaName}
                leixin={TempanyId} />
                </View>)
    }

    NormalCheck(index,TempanyId){
      return (<View style={{marginRight:10,flexDirection:'row',alignItems:'center'}}>
                <Modals gets={this.gets.bind(this)} leixin={TempanyId} pagedata={index} textStyle={{color:'#666',fontSize:13}} data={this.state.AllManger}
                  style={{backgroundColor:"white",height:44,
                  justifyContent:'center',paddingLeft:6}} />
                  <Image source={require('../images/goto.png')} style={{width:20,height:20}}/>
              </View>)
    }

    GetText(index,TempanyId,value){
      return(<View style={{backgroundColor:"white",height:44,justifyContent:'center'}}>
                {value.IsConfirm==1?<View style={{flexDirection:'row',paddingLeft:5,borderTopColor:'#f5f5f5',borderTopWidth:.6,borderStyle:'solid',paddingTop:7,marginTop:7}}>
                                    <CheckBox labelStyle={{color:'#363434'}} checkboxStyle={{width:18,height:18}} label={''} style={{backgroundColor:'rgba(255,255,255,.1)'}}
                                    onChange={(e)=>this.onChangecoform(TempanyId+"_1",e)}></CheckBox></View>:null}
             <TextInput onSubmitEditing={()=>{this.testBlur()}} ref="inputWR" multiline={true} placeholder={"请输入"} underlineColorAndroid="transparent" placeholderTextColor="#666"
                onChangeText={(v)=>this.handleInput(index,v,TempanyId)}
                style={{padding:0,color:'#666',maxWidth:value.ParaName.length>20?'100%':'67%',minWidth:'20%'}}/>
            </View>)
    }

    CheckDates(v,index,TempanyId,indexs){
        return(<View style={{marginRight:v.ParaName=='至'?10:8,flexDirection:'row',alignItems:'center'}}>
            <DatePicker customStyles={{
                        dateInput: {
                        paddingRight:5,
                        alignItems:'flex-end',
                        justifyContent:'center',
                        borderWidth:0,
                        },
                        dateText:{
                            color:'#666'
                        },
                        placeholderText:{
                            color:'#666'
                        }
                    }}
            style={{justifyContent:'center',backgroundColor:"white",height:44}}        
            date={indexs} 
            mode="datetime"        
            format="YYYY-MM-DD HH:mm"
            confirmBtnText="确定"        
            cancelBtnText="取消"
            showIcon={false}
            minDate={new Date(2015, 1, 1)}
            placeholder={"请选择时间"}      
            onDateChange={(e)=>this.onChange(index,e,TempanyId)}/>
            <Image source={require('../images/goto.png')} style={{width:20,height:20}}/>
            </View>)
    }

    AreaInput(value,TempanyId_1,TempanyId,index,i){
          return(<View style={{width:'100%'}}>
          {
            value.IsAdd==1?this.getTextareaItemByID(value,i):<View>
             <TextareaItem placeholderTextColor="#666" placeholder={"请输入"} autoHeight
               onChange={(e)=>this.handleInput(index,e,TempanyId)}
               style={{alignItems:'center',borderBottomColor:'#ccc',borderBottomWidth:1,borderStyle:'solid',color:'#666',fontSize:14,minWidth:'100%',backgroundColor:"white",paddingHorizontal:0,height:44}} />
             <View style={{flexDirection:'row',backgroundColor:"white",padding:5}}>
                <CheckBox checkboxStyle={{width:18,height:18}} label={''}
                  style={{backgroundColor:'rgba(255,255,255,.1)'}}
                  onChange={(e)=>this.onChangecoform(TempanyId_1,e)}>
                </CheckBox>
               </View>
             </View>
          }
        </View>)
    }

    sub(){
      return(<View>
        {this.state.num?<View>
        <View style={{width:'100%',padding:5,paddingTop:10,justifyContent:'center'}}>
            <Text style={{color:'#363434',left:8,fontSize:15}}>提交</Text>
        </View>
        <View style={{marginTop:5,width:'100%',alignItems:'center'}}>
           <View style={{width:'100%',backgroundColor:'white',alignItems:'center'}}>
            <View style={{marginLeft:15,height:50,paddingBottom:10,paddingTop:10,flexDirection:'row',width:'96%',alignItems:'center',borderBottomColor:'#ccc',borderStyle:'solid',borderBottomWidth:1}}>
              <Text style={{color:'#363434',flex:1,fontSize:16}}>是否同意</Text>
              <ModalDropdown dropdownTextStyle={{fontSize:15}} dropdownStyle={{width:'50%',backgroundColor:'#eee',borderWidth:0,elevation:3}} textStyle={{color:'#363434',fontSize:13}} 
               style={{justifyContent:'center',marginLeft:10}} defaultValue={'同意'} options={['同意']} onSelect={(index,v)=>this.sssgo(index,v)}/>
               <Image source={require('../images/goto.png')} style={{width:20,height:20,marginRight:10}}/>
            </View>
            <View style={{marginLeft:15,height:50,paddingBottom:8,paddingTop:8,flexDirection:'row',width:'96%',alignItems:'center',borderBottomColor:'#ccc',borderStyle:'solid',borderBottomWidth:1}}>
              <Text style={{color:'#363434',flex:1,fontSize:16}}>流转状态</Text>
             {
              this.state.status!="" && <ModalDropdown dropdownTextStyle={{fontSize:15}} dropdownStyle={{width:'50%',backgroundColor:'#eee',borderWidth:0,elevation:3}} textStyle={{color:'#363434',fontSize:13}} 
              style={{justifyContent:'center',marginLeft:10}} defaultValue={'请选择'} options={this.state.status}/>
             }
             <Image source={require('../images/goto.png')} style={{width:20,height:20,marginRight:10}}/>
            </View>
            <View style={{flexDirection:'row',marginLeft:15,width:'96%',borderBottomColor:'#ccc',borderStyle:'solid',borderBottomWidth:1,paddingBottom:10,paddingTop:10}}>
              <Text style={{color:'#363434',fontSize:16,flex:1}}>流转目标</Text>
              <TicketDropdownCheckBox style={{marginRight:10}} open={this.open.bind(this)} TextColor={{color:'#363434',fontSize:13}} SelectData={this.state.user}/>
            </View>
            <View style={{width:'96%',paddingBottom:8,paddingTop:8,marginLeft:15}}>
              <Text style={{color:'#363434',fontSize:16}}>详细意见</Text>
              <TextareaItem last={true}  placeholderTextColor="#363434" style={{paddingHorizontal:0,color:"#363434",fontSize:14,minWidth:'95%',maxWidth:'95%'}} placeholder="请输入内容..." autoHeight onChangeText={(v)=>this.handleInputs('detailInfo',v)}/>
            </View>
           </View>
        </View>
        </View>:null}
        </View>)
    }

    render(){
        let getAllTempanyId = this.state.getAllTempanyId;
        return(<View style={{alignItems:'center',width: '100%', height: '100%'}}>
        <TicketTitle navigation={this.props.navigation} num={this.state.num} centerText={this.props.navigation.state.params.v}/>
        {this.state.num?null:<View style={{justifyContent:'center',alignItems:'center',position:'absolute',zIndex:1000,width:'100%',height:'70%',top:'20%'}}>
              <ActivityIndicator color="#363434"/>
              <Text style={{color:'#363434',fontSize:15,marginTop:15,zIndex:1000000}}>加载中...</Text>
        </View>}
        <ScrollView>
        <View style={{height:15,borderBottomColor:'#ccc',borderBottomWidth:1,borderStyle:'solid'}}></View>
        {
          this.state.newsz.map((v,i)=>{
        //    let dis = this.chackSSSS(v.TicketParaID);
           let itemMsg = this.isChacked(i);
           return (<View key={i} style={{alignItems:'center',minWidth:'100%',backgroundColor:'white',borderBottomWidth:this.state.newsz.length==i+1?1:0,borderBottomColor:'#ccc',borderStyle:'solid'}}>
            <View style={{width:v.ParaTypeID==3||v.ParaTypeID==2||v.ParaTypeID==4||v.ParaTypeID==6?'96%':v.ParaTypeID==5?v.ParaName=='至'?'96%':'93.5%':'100%',
                  backgroundColor:v.ParaTypeID!="1"?'white':'transparent',paddingTop:v.ParaTypeID=='1'?0:5,  
                  paddingLeft:v.ParaTypeID==3||v.ParaTypeID==5||v.ParaTypeID==2||v.ParaTypeID==4||v.ParaTypeID==6?0:v.ParaName=='至'?10:5,
                  marginLeft:v.ParaTypeID==3||v.ParaTypeID==2||v.ParaTypeID==4||v.ParaTypeID==6?15:v.ParaTypeID==5?v.ParaName=='至'?15:20:0,
                  paddingBottom:v.ParaTypeID=='1'?0:5,
                  paddingRight:0,
                  borderBottomColor:'#ccc',
                  flexWrap:'wrap',
                  borderBottomWidth:(v.ParaTypeID==3||v.ParaTypeID==5||v.ParaTypeID==2||v.ParaTypeID==4||v.ParaTypeID==6)&&this.state.newsz.length==i+1?0:1,
                  borderStyle:'solid',
                  flexDirection:v.ParaName.length>25?'column':'row',alignItems:v.ParaName.length>25?'baseline':'center'}}>
                 <Text style={{fontSize:v.ParaTypeID=='1'?16:15,color:'#333',marginLeft:v.ParaTypeID==3||v.ParaTypeID==2||v.ParaTypeID==4||v.ParaTypeID==6?0:v.ParaTypeID==5?v.ParaName=='至'?7:0:10,flex:1,flexWrap:'wrap',paddingRight:5}}>{v.ParaName}</Text>
                  {v.IsAdd==1?<TouchableOpacity onPress={()=>this.add(v.TicketParaID)} style={{width:'11.6%',height:25,justifyContent:'center',alignItems:'center'}}>
                            <Image style={{width:23,top:1,height:23,resizeMode:Image.resizeMode.contain}} source={require('../images/add.png')}/>
                  </TouchableOpacity>:v.ParaTypeID==3?this.NormalCheck('datalist'+i,getAllTempanyId[i]):v.ParaTypeID==5?this.CheckDates(v,'datalist'+i,getAllTempanyId[i],itemMsg[i]):v.ParaTypeID==2?this.GetText('datalist'+i,getAllTempanyId[i],v):v.ParaTypeID==4?this.MoreCheck(v,getAllTempanyId[i]):null}
            </View>
               {v.ParaTypeID==6?this.AreaInput(v,getAllTempanyId[i]+"_1",getAllTempanyId[i],'datalist'+i,i):null}
            </View>)
            }
          )
        }
        {this.sub()}
        </ScrollView>
        <View style={{height:65,width:'100%',justifyContent:'center',alignItems:'center'}}>
                {this.state.num?<TouchableOpacity onPress={()=>this.submitAll()} style={{elevation:2,justifyContent:'center',alignItems:'center',width:'80%',backgroundColor:'#0390e8',borderRadius:5,height:40}}>
                        <Text style={{color:'white',fontSize:20,fontWeight:'300'}}>提交</Text>
                </TouchableOpacity>:null}
        </View>
        </View>)
    }
}