import React from 'react';
import Title from './Title';
import {InputItem,DatePicker,List,Checkbox,TextareaItem, Button} from 'antd-mobile-rn';
import {View,Text,ScrollView,TouchableOpacity,Picker,ToastAndroid,Modal} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import {newTiceketNum,searchTicketBasicInfo,TicketBasicInfo,searchTicketFlow,editquanxian,searchUserForRole} from './../api/api'
import DropdownCheckbox from './DropdownCheckbox';
import MyActionSelect from './MyActionSelect';

export default class Tdetail extends React.Component{
    constructor(props){
        super(props)
        this.state={
            value: null,
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
            visible:false
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
            user:aa,
            monst:good.form.dataList[1].ticketroleid,
            status:kl,
            num:x.form.newTicket,
            jax:bool.form.templateContents,
            zed:feel.form.dataList
       })

       this.xunahn(this.state.jax,this.state.zed)
        
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

    onChange = (value) => {
        console.log(value);
        this.setState({ value }); 
      }

    handleInput(k, v){
        this.setState({
            [k]: v
        });
    }




    chackSSSS=(asd)=>{
        let sss = this.state.zed;
        let index = sss.findIndex((v)=>{
            return v.TicketParaID == asd;
        });
        return index==-1;

    }

    render(){
        return(<View style={{justifyContent:'center'}}>
            <Title navigation={this.props.navigation} centerText={this.props.navigation.state.params.v+'('+this.state.num+')'}/>
        <ScrollView style={{display:'flex'}}>
        {
            this.state.jax.map((v,i)=>
            {
           let dis = this.chackSSSS(v.TicketParaID);
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
                  v.ParaTypeID==4? <DropdownCheckbox style={{backgroundColor:'white'}} TextColor={{color:'black',fontSize:13}} SelectData={this.state.user}/>:                   v.ParaTypeID==3?<Picker style={{ height: 50, width:'100%'}} enabled={!dis} mode='dropdown' selectedValue={this.state.language}
                   onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
                   <Picker.Item label="Java" value="java" />
                   <Picker.Item label="JavaScript" value="js" />
                   </Picker>:v.ParaTypeID==2?<InputItem editable={dis} onChange={(v)=>this.handleInput('username',v)} style={{borderRadius:5,backgroundColor:'white',width:'85%',backgroundColor:"#fffeee"}}/>:v.ParaTypeID==5?<View style={{left:5,width:290}}>
                   <DatePicker
                     value={this.state.value}
                     mode="date"
                     minDate={new Date(1999, 7, 6)}
                     maxDate={new Date(2000, 11, 3)}
                     onChange={this.onChange}
                     format="YYYY-MM-DD"
                     disabled={dis}
                   >
                    <List.Item arrow="horizontal"></List.Item>
                    </DatePicker></View>:v.ParaTypeID==6?
                  <View><TextareaItem editable={!dis} placeholder="高度自适应" autoHeight style={{ paddingVertical: 5 ,backgroundColor:"#fffeee"}} />
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
                <Text>是否同意</Text>
                
                <ModalDropdown 
                dropdownStyle={{width:'100%'}} textStyle={{color:'black',fontSize:13,left:5}} 
                style={{backgroundColor:'skyblue',width:'100%',height:29.3,justifyContent:'center'}} defaultValue={'请选择'} options={['同意', '拒绝']}/>
            </View>
            <View style={{display:'flex',justifyContent:'center',margin:5}}>
                <Text>流转状态</Text>
                {
                  this.state.status!="" &&
                  <ModalDropdown 
                  
                  dropdownStyle={{width:'100%'}} textStyle={{color:'black',fontSize:13,left:5}} 
                  style={{backgroundColor:'skyblue',width:'100%',height:29.3,justifyContent:'center'}} defaultValue={'请选择'} options={this.state.status}/>
                }
                </View>
            <View style={{display:'flex',justifyContent:'center',margin:5}}>
                <Text>流转目标</Text>
                
                <DropdownCheckbox style={{backgroundColor:'skyblue'}} TextColor={{color:'black',fontSize:13}} SelectData={this.state.user}/>
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