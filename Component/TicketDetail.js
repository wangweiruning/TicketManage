import React from 'react';
import TicketTitle from './TicketTitle';
import {List,Checkbox,TextareaItem,ActivityIndicator} from 'antd-mobile-rn';
import {View,Text,ScrollView,TouchableOpacity,TextInput,ToastAndroid,Alert,Image} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import DatePicker from 'react-native-datepicker'
import {newTiceketNum,
        searchTicketBasicInfo,
        TicketBasicInfo,
        searchTicketFlow,
        editquanxian,
        searchUserForRole,
        searchTicketRecord,
        tijiao,
        historys,
        userlist,
        findbumen,
        findgroup,
        AllMangerUser,AllDepartment,ForDepartment} from './../api/api';

import TicketDropdownCheckBox from './TicketDropdownCheckBox';
import {StackActions, NavigationActions} from 'react-navigation';
const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Tab' })],
    });
export default class Tdetail extends React.Component{
    constructor(props){
        super(props)
        this.state={
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
            datamore:{}
        }
    }

      async componentDidMount(){
          this.getData();
          
      }
    
     loading(){
        if(this.state.num==''){
             setTimeout(()=>ToastAndroid.show("数据加载缓慢，请耐心等待", ToastAndroid.SHORT))
        }
        else{
             setTimeout(()=>ToastAndroid.show("加载完毕", ToastAndroid.SHORT))
        } 
     }


     async getData(){
        let e = this.props.navigation.state.params.name;
        let r = `?form.templateId=${e}`;
        let x = await newTiceketNum(r);


        let j = x.form.newTicket;
        let a = `?form.ticketNum=${j}`;
        // let g = await searchTicketBasicInfo(a);
        let  ggs= `?form.basicInfoId=null`
        let ssgg= await searchTicketRecord(ggs)

        let opt = `?form.tree_node_operation=0`;
        let userId = await historys(opt);
        let list = await userlist();
        let kjl = `?form.jqgrid_row_selected_id=${e}`;
        let bool = await TicketBasicInfo(kjl);


        let i = this.props.navigation.state.params.v;
        let ghr = `?form.ticketTypeName=${i}`;
        let good = await searchTicketFlow(ghr);


        let black = `?form.flowroleid=${good.form.dataList[0].FlowRoleID}`;
        let feel = await editquanxian(black);

        let fate = `?form.roleId=${good.form.dataList[1].ticketroleid}`;
        let zero = await searchUserForRole(fate);

        let aa = [];
        let kobe = zero.form.dataList;

        let AllManger = await AllMangerUser();
        let Department = await AllDepartment();
        let y = `?form.departmentId=`
        let Team =await ForDepartment(y)
        for(let j in kobe){
              let bryent = kobe[j].realname;
              aa.push(bryent);
          }
          let aaa=[];
          let getAllTempanyId = [];
          let aas=[];
          bool.form.templateContents.map((item,i)=>{

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
        let google = good.form.dataList[1].ticketstatusname;
        kl.push(google)
        
        this.setState({
            ParaId:Team.form.dataList,
            AllManger:AllManger.form.dataList,
            Department:Department.form.dataList,
            userId:userId.form.userId,
            user:zero.form.dataList,
            monst:good.form.dataList[1].ticketroleid,
            statuss:good.form.dataList[0].ticketstatusid,
            roleid:good.form.dataList[2].ticketflowid,
            status:kl,
            basicInfoId:good.form.dataList[0].FlowRoleID,
            flowroleid:bool.form.templateContents[1].FlowRoleID,
            num:x.form.newTicket,
            jax:bool.form.templateContents,
            zed:feel.form.dataList
       })
       console.log(bool,good,Department,'hhhhhhhhhhhhhhhhhhhhhhhhhooooommmmm')
       this.loading();
       this.pipei(list.form.paramAllList);
    //    this.getdepartment();
    //    this.getgroup();
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

    //  async getdepartment(){
    //     let mlxg = `?form.tree_node_id=${this.state.itemsss[0].departmentid}&form.tree_node_operation=2`;
    //     let me = await findbumen(mlxg);
    //     this.setState({
    //         userData:me.form.page.dataRows
    //     })
    //   }

    //  async getgroup(){
    //     let pdd = `?form.tree_node_id=${this.state.itemsss[0].departmentid}&form.tree_node_operation=0`;
    //     let white = await findgroup(pdd);
    //     this.setState({
    //         group:white.form.page.dataRows
    //     })
    //   }
    
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
        let sss= Object.keys(val);
        let display = [];
        for(let i in val){
            if(val[i]){
                display.push(val[i]);
            }
        };
        this.setState({
            vvval:sss.join(",")
        })
    }

    async openothers(val,leixing,banzu){
        let display = [];
        let datas=[];
        console.log(val,"vvvvvvvvvvvvvvvv")
        let alljsitem = Object.keys(val);
        let alljsv = Object.values(val);
        let tts=[];
        let params=[];
        let tindex = alljsv.findIndex((item,index)=>{
            if(item!=""){
                tts.push({[alljsitem[index]]:alljsv[index]});
            }
        })
        console.log(tts,"ttttttttttt")

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
       console.log(s,"eeeeeeeeeeeeeeeeee")
        if(banzu=="班组"){
            this.state.Department.map(item=>{
                if(alljsitem.indexOf(item.DepartmentID) != -1){
                    datas.push(item.DepartmentID)  
                }
            })
        let y = alljsi==''? `?form.departmentId=`:`?form.departmentId=${alljsi}`
        let Team =await ForDepartment(y)
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
        let ss ={[leixing]:datas};
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


    onChangecoform(value,dis){
        console.log(dis,"fffffffffffffffff")
        const listitem ={[value]:dis?1:0}
        const sss=Object.assign(this.state.showChecked,listitem)
      this.setState({
          showChecked:sss
      });
      
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
        console.log("rrr",datamores)
        let data = Object.assign(this.state.pagedata,s)
        let datamore = Object.assign(this.state.datamore,rt)
        

        let datas = Object.assign(this.state.newpagedata,{[three+"*1"]:getarrs})
        
        this.setState({
            pagedata: data,
            newpagedata:datas,
            datamore:datamore
        });
        console.log("fffffffff",datas)
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
    const {newpagedata,showChecked} = {...this.state};
    const tts = Object.assign(newpagedata,showChecked)
    if (this.state.vvval.length<2) {
        Alert.alert("流转目标不能为空！")
    } else {
    let data = {
            "form.basicInfoId": 0,
            "form.ticketTypeName":this.props.navigation.state.params.v,
            "form.ticketStatusId": this.state.statuss,
            "form.ticketNum": this.state.num,
            "form.templateId": this.props.navigation.state.params.name,
            "form.paraData": JSON.stringify(tts),
            "form.flowroleid": this.state.basicInfoId,
            "form.userId":jconfig.userinfo.user,
            "form.recordOption": this.state.stateTr,
            "form.detailInfo": this.state.detailInfo,
            "form.nextFlowId": this.state.roleid,
            "form.nextUserId": this.state.vvval,
        }
        var para = "";
        for(var a in data){
        para +=("&"+a+"="+encodeURIComponent(data[a]));
        }
        para ='?'+para.substr(1,para.length);
        console.log(newpagedata,para,'daaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaad')
        let all = await tijiao(para);
        console.log(all,'daaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaad')
        if(all.form.paraData.length>2){
            Alert.alert(
                '提示',`${this.props.navigation.state.params.v}创建成功！`,
                [
                 {text:'是',onPress:()=>this.props.navigation.dispatch(resetAction)},
                ]
            );
        }
    }
    }

    getSelect(value,datalist,getAllTempanyId){
        console.log(value,datalist)
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
        let varr=this.state.isadd;
        let keys = Object.keys(varr);
        let values = Object.values(varr);
        
        let index = keys.findIndex((item,i)=>{
            if(item==v){
                console.log(varr,"555555555")
                itemsss =  values[i+1]+1;
                let objects = Object.assign(this.state.isadd,{[item]:values[i]+1})
                this.state.isadd=objects;
                this.forceUpdate();
            }
        })  
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
    delete(v){
        let varr=this.state.isadd;
        let keys = Object.keys(varr);
        let values = Object.values(varr);
        let index = keys.findIndex((item,i)=>{
            if(item==v){
                let objects = Object.assign(this.state.isadd,{[item]:values[i]-1<=1?1:values[i]-1})
                this.state.isadd=objects;
                this.forceUpdate();
            }
        })
    }
    render(){
        let getAllTempanyId = this.state.getAllTempanyId
        return(<View style={{position:'relative',justifyContent:'center',flex:1}}>
            <TicketTitle navigation={this.props.navigation} num={this.state.num} centerText={this.props.navigation.state.params.v+' '+this.state.num}/>
            {this.state.num?null:<View style={{top:43,justifyContent:'center',alignItems:'center',position:'absolute',zIndex:1000,backgroundColor:'lightgray',width:'100%',height:'100%'}}>
              <ActivityIndicator color="#03c1eb"/>
              <Text style={{color:'#007aff',fontSize:15,marginTop:15}}>加载中...</Text>
        </View>}
        <ScrollView style={{display:'flex'}}>
        {
            this.state.jax.map((v,i)=>
            {
           let dis = this.chackSSSS(v.TicketParaID);
           let itemMsg = this.isChacked(i);
           return <View key={i} style={{marginTop:5,elevation:3,borderRadius:3}}>
              <View style={{
                  flexWrap:'wrap',
                  width:'99%',
                  padding:5,
                  flexDirection:'row',
                  borderStyle:'solid',
                  alignItems:'center',
                  }}>
                  <Text style={{color:'#3f4044',left:5}}>{v.ParaName}</Text>
                  {v.IsAdd==1&& <View style={{flexDirection:'row',padding:5,justifyContent:'center'}}>
                         <TouchableOpacity onPress={()=>this.add(v.TicketParaID)}>
                            <Image resizeMode="contain" style={{width:20,height:20}} source={require('../images/add.png')}/>  
                        </TouchableOpacity></View>}
              </View>
               {      
                  v.ParaTypeID==4? 
                  <TicketDropdownCheckBox isshow={dis}
                  open={this.openothers.bind(this)} style={{backgroundColor:'white'}} 
                  ischanges={this.state.ischanges}
                  TextColor={{color:'black',backgroundColor:dis?"#fffeee":"#cccfff"}} 
                  SelectData={v.ParaName=="班组"?this.state.Department:this.state.ParaId} 
                  banzu={v.ParaName}
                  leixin={getAllTempanyId[i]}/>: 
                  v.ParaTypeID==3?
                  <ModalDropdown 
                  dropdownTextStyle={{fontSize:15}}
                  disabled={dis}
                  textStyle={{color:'black',fontSize:13,left:5}} 
                  style={{backgroundColor:!dis?"#fffeee":"#cccfff",
                  height:29.3,justifyContent:'center'}}  
                  defaultValue={v.ParaName=="工作负责人"?this.state.isgzfzr?this.state.isgzfzr:"请选择":"请选择"}
                  onSelect={(e,value)=>this.getSelect(value,'datalist'+i,getAllTempanyId[i])}
                  options={this.BackpageUseName()}/>:v.ParaTypeID==2 ?
                  <View>
                    <TextInput editable={!dis} placeholder="请输入内容..." underlineColorAndroid="transparent"
                    onChangeText={(v)=>this.handleInput('datalist'+i,v,getAllTempanyId[i])} style={{backgroundColor:'white',width:'100%',backgroundColor:!dis?"#fffeee":"#cccfff"}}/>
                    {v.IsConfirm==1?<View style={{flexDirection:'row',padding:5}}>
                    <Checkbox onChange={(e)=>this.onChangecoform(getAllTempanyId[i]+"_1",e.target.checked)}
                        disabled={!dis}
                    ><Text>是否已执行</Text></Checkbox></View>:null}
                    </View>
                    :v.ParaTypeID==5?
                    <DatePicker      
                    style={{width:"100%",backgroundColor:dis?"#fffeee":"#cccfff"}}        
                    date={itemMsg[i]} 
                    mode="datetime"        
                    format="YYYY-MM-DD HH:mm"         
                    confirmBtnText="确定"        
                    cancelBtnText="取消"      
                    showIcon={true} 
                    disabled={!dis} 
                    minDate={new Date(2015, 1, 1)}
                    placeholder="请选择时间"      
                    onDateChange={(e)=>this.onChange('datalist'+i ,e,getAllTempanyId[i])}/>
                    :
                    v.ParaTypeID==6?
                  <View>
                    {/* {v.IsAdd==1&& <View style={{flexDirection:'row',marginLeft:5}}>
                         <TouchableOpacity onPress={()=>this.add(v.TicketParaID)}>
                            <Image resizeMode="contain" style={{width:20,height:20}} source={require('../images/add.png')}/>  
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.delete(v.TicketParaID)}>
                            <Image resizeMode="contain" style={{width:20}} source={require('../images/delete.png')}/>
                        </TouchableOpacity>
                    </View>} */}
                    {
                      v.IsAdd==1?new Array(this.isnums(v.TicketParaID)).fill(7).map((item, index) => <TextareaItem key={index} editable={!dis} placeholder="请输入内容..."
                      onChange={(e)=>this.handleInputmore('datalist'+i,e,getAllTempanyId[i],index)}
                      autoHeight 
                      style={{ paddingVertical: 5 ,backgroundColor:!dis?"#fffeee":"#cccfff"}} />):<TextareaItem  editable={!dis} placeholder="请输入内容..."
                      onChange={(e)=>this.handleInput('datalist'+i,e,getAllTempanyId[i])}
                      autoHeight 
                      style={{ paddingVertical: 5 ,backgroundColor:!dis?"#fffeee":"#cccfff"}} />
                    }
                  {v.IsConfirm==1?<View style={{flexDirection:'row'}}><Checkbox onChange={(e)=>this.onChangecoform('Checkbox'+i,e.target.checked)} disabled={dis}/><Text>是否已执行</Text></View>:<Text></Text>}
                  </View>:null
               }
            </View>
            }
            )
        }
            <View style={{marginTop:5,marginBottom:20,width:'100%',alignItems:'center'}}>
              <View style={{
                  width:'100%',
                  padding:5,
                  justifyContent:'center',
                  }}>
                  <Text style={{color:'#3f4044',left:5}}>提交</Text>
              </View>
            <View style={{width:'97%',display:'flex',justifyContent:'center',margin:5,backgroundColor:'white',elevation:2,padding:5}}>
                <Text style={{color:'#3f4044'}}>是否同意</Text>
                <ModalDropdown dropdownTextStyle={{fontSize:15}} dropdownStyle={{height:50,width:'97%'}} textStyle={{color:'black',fontSize:13,left:5}} 
                style={{backgroundColor:'#fffeee',width:'100%',height:29.3,justifyContent:'center'}} defaultValue={'同意'} options={['同意']} onSelect={(index,v)=>this.sssgo(index,v)}/>
            </View>
            <View style={{width:'97%',display:'flex',justifyContent:'center',margin:5,backgroundColor:'white',elevation:2,padding:5}}>
                <Text style={{color:'#3f4044'}}>流转状态</Text>
                {
                  this.state.status!="" &&
                  <ModalDropdown dropdownTextStyle={{fontSize:15}} dropdownStyle={{height:50,width:'97%'}} textStyle={{color:'black',fontSize:13,left:5}} 
                  style={{backgroundColor:'#fffeee',width:'100%',height:29.3,justifyContent:'center'}} defaultValue={'请选择'} options={this.state.status}/>
                }
            </View>
            <View style={{width:'97%',display:'flex',justifyContent:'center',margin:5,backgroundColor:'white',elevation:2,padding:5}}>
                <Text style={{color:'#3f4044'}}>流转目标</Text>
                <TicketDropdownCheckBox open={this.open.bind(this)} style={{backgroundColor:'#fffeee'}} TextColor={{color:'black'}} SelectData={this.state.user}/>
            </View>
            <View style={{width:'97%',display:'flex',justifyContent:'center',margin:5,backgroundColor:'white',elevation:2,padding:5}}>
                <Text style={{color:'#3f4044'}}>详细意见</Text>
                <TextareaItem placeholder="请输入内容..." autoHeight onChangeText={(v)=>this.handleInputs('detailInfo',v)} style={{ paddingVertical: 5 ,backgroundColor:"#fffeee"}}/>
            </View>
            </View>
            <View style={{marginBottom:50,width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity 
                            onPress={()=>this.submitAll()}
                            style={{
                                elevation:2,
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