import React from 'react';
import TicketTitle from './TicketTitle';
import {DatePicker,List,Checkbox,TextareaItem} from 'antd-mobile-rn';
import {View,Text,ScrollView,TouchableOpacity,TextInput,ToastAndroid} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import {newTiceketNum,searchTicketBasicInfo,TicketBasicInfo,searchTicketFlow,editquanxian,searchUserForRole} from './../api/api'
import DropdownCheckbox from './DropdownCheckbox';

export default class Tdetail extends React.Component{
    constructor(props){
        super(props)
        this.state={
            vvval:"111,哈哈,超级管理员",
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
        }
    }

      async componentDidMount(){
          this.getData();
          
      }
    
     loding(){
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
        let g = await searchTicketBasicInfo(a);



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
        for(let j in kobe){
              let bryent = kobe[j].realname;
              aa.push(bryent);
          }
          let aaa=[];
          bool.form.templateContents.map((item,i)=>{
            let dd={["datalist"+i]:null};
             aaa=Object.assign(this.state.pagedata,dd)
          })
          this.setState({pagedata:aaa})

        
        let kl = [];
        let google = good.form.dataList[1].ticketstatusname;
        kl.push(google)
        
        this.setState({
            user:zero.form.dataList,
            monst:good.form.dataList[1].ticketroleid,
            status:kl,
            num:x.form.newTicket,
            jax:bool.form.templateContents,
            zed:feel.form.dataList
       })
       this.loding();
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
        let display = [];
    
        for(let i in val){
            if(val[i]){
                display.push(val[i]);
            }
        };
        this.setState({
            vvval:display.join(",")
        })
    }

    onChange(tt,value){
        let dd= new Date(value)
        let s ={[tt]:dd};
        let data = Object.assign(this.state.pagedata,s)
        this.setState({
            pagedata:data
        });

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
        this.setState({
            pagedata: data
        });
        alert(v)
    }
    isChacked=(ss)=>{
        let sss = this.state.pagedata;
        
        let aa = Object.values(sss);
             return aa;
    }
   
    chackSSSS=(asd)=>{
        let sss = this.state.zed;
        let index = sss.findIndex((v)=>{
            return v.TicketParaID == asd;
        });
        return index==-1;

    }
 
    submitAll=()=>{
        const {pagedata} = {...this.state};
        console.log(this.state,'ffff')
    }


    render(){
        return(<View style={{justifyContent:'center'}}>
            <TicketTitle navigation={this.props.navigation} num={this.state.num} centerText={this.props.navigation.state.params.v+'('+this.state.num+')'}/>
        <ScrollView style={{display:'flex'}}>
        {
            this.state.jax.map((v,i)=>
            {
           let dis = this.chackSSSS(v.TicketParaID);
          
           let itemMsg = this.isChacked(i);
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
               {      
                  v.ParaTypeID==4? 
                  <DropdownCheckbox  open={this.open.bind(this)} style={{backgroundColor:'white',height:50}} 
                  TextColor={{color:'black',fontSize:13}} SelectData={this.state.user}/>: 
                  v.ParaTypeID==3?
                  <ModalDropdown 
                  disabled={dis}
                  dropdownStyle={{width:'100%'}} 
                  textStyle={{color:'black',fontSize:13,left:5}} 
                  style={{backgroundColor:'skyblue',width:'100%',
                  height:29.3,justifyContent:'center'}}  
                  defaultValue={'请选择'}
                  options={this.state.status}/>:v.ParaTypeID==2?
                  <View>
                   <TextInput editable={!dis}
                    onChangeText={(v)=>this.handleInput('datalist'+i,v)} style={{borderRadius:5,backgroundColor:'white',width:'100%',backgroundColor:"#fffeee"}}/>
                    {v.IsConfirm==1?<View style={{flexDirection:'row',margin:5}}>
                    <Checkbox onChange={(e)=>this.onChangecoform('Checkbox'+i,e.target.checked)}
                        disabled={!dis}
                    ><Text>是否已执行</Text></Checkbox></View>:null}
                    </View>
                    :v.ParaTypeID==5?<View style={{left:5,width:290}}>
                   <DatePicker 
                     value={itemMsg[i]}
                     mode="date"
                     minDate={new Date(2015,1,1)}
                     onChange={(e)=>this.onChange('datalist'+i ,e)}
                     format="YYYY-MM-DD"
                     disabled={dis}
                   >
                    <List.Item arrow="horizontal"></List.Item>
                    </DatePicker></View>:v.ParaTypeID==6?
                  <View><TextareaItem editable={!dis} placeholder={'请输入'}
                  onChange={(v)=>this.handleInput('datalist'+i,v)}
                //   value={itemMsg[i-1]} 
                  autoHeight 
                  style={{ paddingVertical: 5 ,backgroundColor:"#fffeee"}} />
                  {v.IsConfirm==1?<View style={{flexDirection:'row'}}><Checkbox onChange={(e)=>this.onChangecoform('Checkbox'+i,e.target.checked)} disabled={dis}/><Text>是否已执行</Text></View>:<Text></Text>}
                  </View>:null
               }
            </View>
            }
            )
        }
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
            <View style={{display:'flex',justifyContent:'center',margin:5}}>
                <Text style={{color:'black'}}>是否同意</Text>
                <ModalDropdown dropdownStyle={{width:'100%'}} textStyle={{color:'black',fontSize:13,left:5}} 
                style={{backgroundColor:'skyblue',width:'100%',height:29.3,justifyContent:'center'}} defaultValue={'请选择'} options={['同意', '拒绝']}/>
            </View>
            <View style={{display:'flex',justifyContent:'center',margin:5}}>
                <Text style={{color:'black'}}>流转状态</Text>
                {
                  this.state.status!="" &&
                  <ModalDropdown dropdownStyle={{width:'100%'}} textStyle={{color:'black',fontSize:13,left:5}} 
                  style={{backgroundColor:'skyblue',width:'100%',height:29.3,justifyContent:'center'}} defaultValue={'请选择'} options={this.state.status}/>
                }
                </View>
            <View style={{display:'flex',justifyContent:'center',margin:5}}>
            
                <Text style={{color:'black'}}>流转目标</Text>
                <DropdownCheckbox  open={this.open.bind(this)} style={{backgroundColor:'skyblue'}} TextColor={{color:'black',fontSize:13}} SelectData={this.state.user}/>
            </View>
            </View> 
            <View style={{marginBottom:50,width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity 
                            onPress={()=>this.submitAll()}
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