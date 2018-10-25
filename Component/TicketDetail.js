import React from 'react';
import Title from './Title';
import {InputItem,DatePicker,List,Checkbox,TextareaItem, Button} from 'antd-mobile-rn';
import {View,Text,ScrollView,TouchableOpacity,Picker,ToastAndroid,Modal,DatePickerAndroid} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import {newTiceketNum,searchTicketBasicInfo,TicketBasicInfo,searchTicketFlow,editquanxian,searchUserForRole} from './../api/api'
import DropdownCheckbox from './DropdownCheckbox';

export default class Tdetail extends React.Component{
    constructor(props){
        super(props)
        this.state={

            num:'',
            jax:[],
            zed:[],
            ContentID:'',
            rolecontentid:'',
            index:'',
            user:[],
            status:'',
            find:[],
            language:'',
            visible:false,
            listdata:[],
            pagedata:{},//输入框
            pagePicker:{},//Picker单选
            AllPicker:{},//多选
            AreaItem:{},//多行文本
            Timer:{datalist17:'Tue Aug 01 2000 00:00:00 GMT+0800'}//时间

        }
    }

      async componentDidMount(){
          if(!jconfig.userinfo) return ToastAndroid.show('请登录',ToastAndroid.SHORT);
          this.getData()
         
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

       this.xunahn(this.state.jax,this.state.zed)
       this.getlls(bool.form.templateContents);
       this.getdefault(bool.form.templateContents)
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
      getdefault(datas){
        let s={};
        var data={};
            datas.map((v,i)=>{
                if (v.ParaTypeID=="2"){
                        var datalist ="datalist"+i;
                        s ={[datalist]:v.ParaName};
                            data = Object.assign(this.state.pagedata,s);
                        this.setState({
                            pagedata: data
                        });
                } else if (v.ParaTypeID=="3"){
                    var datalist ="Picker"+i;
                    s ={[datalist]:v.ParaName};
                        data = Object.assign(this.state.pagePicker,s);
                    this.setState({
                        pagePicker: data
                    });
            } else if (v.ParaTypeID=="4"){
                var datalist ="AllPicker"+i;
                s ={[datalist]:v.ParaName};
                    data = Object.assign(this.state.AllPicker,s);
                this.setState({
                    AllPicker: data
                });
        }  else if (v.ParaTypeID=="5"){
            var datalist ="Timer"+i;
            s ={[datalist]:v.ParaName};
                data = Object.assign(this.state.Timer,s);
            this.setState({
                Timer: data
            });
    } else if (v.ParaTypeID=="6"){
        var datalist ="AreaItem"+i;
        s ={[datalist]:v.ParaName};
            data = Object.assign(this.state.AreaItem,s);
        this.setState({
            AreaItem: data
        });
}        
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


    onChange(tt,value){
        console.log(typeof value,'sadf')
        var d = new Date(value);  
        // this.format(d,"YYYY-MM-DD")
        let s ={[tt]:d};
        let data = Object.assign(this.state.Timer,s)
        this.setState({
            Timer:data
        });
        
        console.log(data,'sasf');
        // this.setState({ value }); 
      }

    handleInput(k, v){
        let s ={[k]:v};
        let data = Object.assign(this.state.pagedata,s)
        this.setState({
            pagedata: data
        });
        alert(v)
    }

    format(time, format){
        var t = new Date(time);
        var tf = function(i){return (i < 10 ? '0' : '') + i};
        return format.replace(/YYYY|MM|DD|HH|mm|ss/g, function(a){
            switch(a){
                case 'YYYY':
                return tf(t.getFullYear());
                break;
                case 'MM':
                return tf(t.getMonth() + 1);
                break;
                case 'mm':
                return tf(t.getMinutes());
                break;
                case 'DD':
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

    chacked=(tt)=>{
        let sss = this.state.jax;
        let index = sss.map((v)=>{
           if(v.TicketParaID == tt) {
               return v.ParaName
           }
        });
        return index;
    }
    chackSSSS=(asd)=>{
        let sss = this.state.zed;
        let index = sss.findIndex((v)=>{
            return v.TicketParaID == asd;
        });
        return index==-1;

    }
 
    submitAll=()=>{
        const {pagedata,pagePicker,AllPicker,Timer,AreaItem} = {...this.state};
        const ttt = Object.assign({},pagedata,pagePicker,AllPicker,Timer,AreaItem)
        console.log(ttt,"333333333333")
    }


    render(){
        const datalist = this.state.listdata;
        return(<View style={{justifyContent:'center'}}>
            <Title navigation={this.props.navigation} centerText={this.props.navigation.state.params.v+'('+this.state.num+')'}/>
        <ScrollView style={{display:'flex'}}>
        {
            this.state.jax.map((v,i)=>
            {
           let dis = this.chackSSSS(v.TicketParaID);
           let disss = this.chacked(v.TicketParaID);
           console.log(disss[i],"33333333333444")
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
                  <DropdownCheckbox style={{backgroundColor:'white',height:50}} TextColor={{color:'black',fontSize:13}} SelectData={this.state.user}/>: 
                  v.ParaTypeID==3?<ModalDropdown 
                  dropdownStyle={{width:'100%'}} textStyle={{color:'black',fontSize:13,left:5}} 
                  style={{backgroundColor:'skyblue',width:'100%',height:29.3,justifyContent:'center'}}  defaultValue={'请选择'} options={this.state.status}/>:v.ParaTypeID==2?
                   <InputItem editable={dis} 
                    defaultValue={disss[i]}
                    onChange={(v)=>this.handleInput('datalist'+i,v)} style={{borderRadius:5,backgroundColor:'white',width:'85%',backgroundColor:"#fffeee"}}/>:v.ParaTypeID==5?<View style={{left:5,width:290}}>       
                   <DatePicker 
                
                    defaultValue={new Date(disss[i])}
                    value={new Date(this.state.Timer  && this.state.Timer.datalist17)}
                     mode="date"

                     minDate={new Date(2015,1,1)}
                     onChange={(e)=>this.onChange('datalist'+i ,e)}
                     format="YYYY-MM-DD"
                
                    //  disabled={dis}
                   >
                    <List.Item arrow="horizontal"></List.Item>
                    </DatePicker></View>:v.ParaTypeID==6?
                
                  <View><TextareaItem editable={!dis} defaultValue={disss[i]} autoHeight style={{ paddingVertical: 5 ,backgroundColor:"#fffeee"}} />
                  {v.ParaName==='安全措施（必要时可附页绘图说明）'?<View style={{flexDirection:'row'}}><Checkbox disabled={dis}/><Text>是否已执行</Text></View>:<Text></Text>}
                  </View>:<Text></Text>
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
                <ModalDropdown 
                dropdownStyle={{width:'100%'}} textStyle={{color:'black',fontSize:13,left:5}} 
                style={{backgroundColor:'skyblue',width:'100%',height:29.3,justifyContent:'center'}} defaultValue={'请选择'} options={['同意', '拒绝']}/>
            </View>
            <View style={{display:'flex',justifyContent:'center',margin:5}}>
  
                <Text style={{color:'black'}}>流转状态</Text>
                {
                  this.state.status!="" &&
                  <ModalDropdown 
                 
                  dropdownStyle={{width:'100%'}} textStyle={{color:'black',fontSize:13,left:5}} 
                  style={{backgroundColor:'skyblue',width:'100%',height:29.3,justifyContent:'center'}} defaultValue={'请选择'} options={this.state.status}/>
                }
                </View>
            <View style={{display:'flex',justifyContent:'center',margin:5}}>
            
                <Text style={{color:'black'}}>流转目标</Text>
                
                <DropdownCheckbox style={{backgroundColor:'skyblue'}} TextColor={{color:'black',fontSize:13}} SelectData={this.state.user}/>
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