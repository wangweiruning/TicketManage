import React from 'react';
import Title from './Title';
import {InputItem,DatePicker,List,Checkbox,TextareaItem} from 'antd-mobile-rn';
import {View,Text,ScrollView,TouchableOpacity,Picker,ToastAndroid} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import {newTiceketNum,searchTicketBasicInfo,TicketBasicInfo,searchTicketFlow,editquanxian} from './../api/api'
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
            num:'',
            jax:[],
            zed:[],
            ContentID:'',
            rolecontentid:''
        }
    }

      async componentDidMount(){
          if(!jconfig.userinfo) return ToastAndroid.show('请登录',ToastAndroid.SHORT);
          let e = this.props.navigation.state.params.name
          let r = `?form.templateId=${e}`
          let x = await newTiceketNum(r)        
          let j = x.form.newTicket;
          let a = `?form.ticketNum=${j}`;
          let g = await searchTicketBasicInfo(a);
          let kjl = `?form.jqgrid_row_selected_id=${e}`;
          let bool = await TicketBasicInfo(kjl)
          let i = this.props.navigation.state.params.v;
          let ghr = `?form.ticketTypeName=${i}`;
          let good = await searchTicketFlow(ghr);
          let black = `?form.flowroleid=${good.form.dataList[0].FlowRoleID}`;
          let feel = await editquanxian(black);
          this.setState({
               num:x.form.newTicket,
               jax:bool.form.templateContents,
               zed:feel.form.dataList
          })
        //   console.log(g,'wwwweeeeewwwe',bool,good,this.state.zed)
          this.xunahn(this.state.jax,this.state.zed)
      }
    
      xunahn(sss,kkk){
        let s = sss;
        let g = kkk;
        for(let i in s){
            for(let c in g){
                this.setState({
                     ContentID:g[c].TicketParaID,
                     rolecontentid:s[i].TicketParaID
                })
                if(this.state.ContentID===this.state.rolecontentid){
                    console.log(this.state.ContentID,this.state.rolecontentid,'>>>>>><<<<<<<')
                }
            }
        }
        // let iii = g.findIndex((item)=>{
        //     this.setState({
        //         ContentID:item.TemplateContentID
        //     })
        // })
        // let index = s.findIndex((item)=>{
        //   console.log(`${item.TemplateContentID}===>${this.state.ContentID}`);
        //     return (item.TemplateContentID === this.state.ContentID)
        // });
        // console.log("index ====>",index,iii,this.state.ContentID);
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
        return(<View style={{justifyContent:'center'}}>
            <Title navigation={this.props.navigation} centerText={this.props.navigation.state.params.v+'('+this.state.num+')'}/>
        <ScrollView style={{display:'flex'}}>
        {
            this.state.jax.map((v,i)=>
            <View  key={i} style={{backgroundColor:'white',marginTop:5}}>
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
                   v.ParaTypeID==4?<Picker style={{ height: 50, width: 100 }} mode='dropdown' enabled={this.state.ContentID==v.TicketParaID?true:false}>
                   <Picker.Item label="Java" value="java" />
                   <Picker.Item label="JavaScript" value="js" />
                   </Picker>
                   :v.ParaTypeID==3?<Picker style={{ height: 50, width: 100 }} mode='dropdown' enabled={this.state.ContentID==v.TicketParaID?true:false}>
                   <Picker.Item label="Java" value="java" />
                   <Picker.Item label="JavaScript" value="js" />
                   </Picker>:v.ParaTypeID==2?<InputItem editable={this.state.ContentID==v.TicketParaID?true:false} onChange={(v)=>this.handleInput('username',v)} style={{borderRadius:5,backgroundColor:'white',width:'85%'}}/>:v.ParaTypeID==5?<View style={{left:5,width:290}}>
                   <DatePicker
                     value={this.state.value}
                     mode="date"
                     minDate={new Date(1999, 7, 6)}
                     maxDate={new Date(2000, 11, 3)}
                     onChange={this.onChange}
                     format="YYYY-MM-DD"
                     disabled={this.state.ContentID==v.TicketParaID?false:true}
                   >
                    <List.Item arrow="horizontal"></List.Item>
                    </DatePicker></View>:v.ParaTypeID==6?
                  <View><TextareaItem editable={this.state.ContentID==v.TicketParaID?true:false} placeholder="高度自适应" autoHeight style={{ paddingVertical: 5 }} />
                  {v.ParaName==='安全措施（必要时可附页绘图说明）'?<View style={{flexDirection:'row'}}><Checkbox /><Text>是否已执行</Text></View>:<Text></Text>}
                  </View>:<Text></Text>
               }
            </View>
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