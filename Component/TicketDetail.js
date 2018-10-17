import React from 'react';
import Title from './Title';
import {InputItem,DatePicker,List,Checkbox} from 'antd-mobile-rn';
import {View,Text,ScrollView,TouchableOpacity} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import HttpUtils from '../api/Httpdata';
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
        }
    }
    
      sub(url,{}){
        HttpUtils.post({}).then({}).catch({})
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
            <Title navigation={this.props.navigation} centerText={this.props.navigation.state.params.name}/>
        <ScrollView style={{display:'flex'}}>
            <View style={{backgroundColor:'white',marginTop:5}}>
              <View style={{
                  width:'100%',
                  height:30,
                  backgroundColor:'white',
                  borderBottomWidth:1,
                  borderBottomColor:'black',
                  borderStyle:'solid',
                  justifyContent:'center',
                  }}>
                  <Text style={{color:'#3e5ed2',left:5}}>基本信息</Text>
              </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Text style={{left:5}}>单位</Text>
                <InputItem onChange={(v)=>this.handleInput('username',v)} style={{borderRadius:5,backgroundColor:'white',width:'85%'}}/>
            </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Text style={{left:5}}>编号</Text>
                <InputItem onChange={(v)=>this.handleInput('username',v)} style={{borderRadius:5,backgroundColor:'white',width:'85%'}}/>
            </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Text style={{left:5}}>工作负责人</Text>
                <ModalDropdown defaultValue={'请选择'} options={['option 1', 'option 2']}/>
            </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Text style={{left:5}}>班组</Text>
                <InputItem onChange={(v)=>this.handleInput('username',v)} style={{borderRadius:5,backgroundColor:'white',width:'85%'}}/>
            </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Text style={{left:5}}>工作班成员</Text>
                <DropdownCheckbox datas={this.state.na}/>
            </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Text style={{left:5}}>工作发电厂名称</Text>
                <InputItem onChange={(v)=>this.handleInput('username',v)} style={{borderRadius:5,backgroundColor:'white',width:'85%'}}/>
            </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Text style={{left:5}}>设备名称</Text>
                <InputItem onChange={(v)=>this.handleInput('username',v)} style={{borderRadius:5,backgroundColor:'white',width:'85%'}}/>
            </View>
            </View>
            <View style={{backgroundColor:'white',marginTop:5}}>
              <View style={{
                  width:'100%',
                  height:30,
                  backgroundColor:'white',
                  borderBottomWidth:1,
                  borderBottomColor:'black',
                  borderStyle:'solid',
                  justifyContent:'center',
                  }}>
                  <Text style={{color:'#3e5ed2',left:5}}>工作任务</Text>
              </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Text style={{left:5}}>工作地点</Text>
                <InputItem onChange={(v)=>this.handleInput('username',v)} style={{borderRadius:5,backgroundColor:'white',width:'85%'}}/>
            </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Text style={{left:5}}>工作设备</Text>
                <InputItem onChange={(v)=>this.handleInput('username',v)} style={{borderRadius:5,backgroundColor:'white',width:'85%'}}/>
            </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Text style={{left:5}}>工作内容</Text>
                <InputItem onChange={(v)=>this.handleInput('username',v)} style={{borderRadius:5,backgroundColor:'white',width:'85%'}}/>
            </View>
            </View>
            <View style={{backgroundColor:'white',marginTop:5}}>
              <View style={{
                  width:'100%',
                  height:30,
                  backgroundColor:'white',
                  borderBottomWidth:1,
                  borderBottomColor:'black',
                  borderStyle:'solid',
                  justifyContent:'center',
                  }}>
                  <Text style={{color:'#3e5ed2',left:5}}>注意事项</Text>
              </View>
            <View style={{}}>
                <Text style={{left:5}}>安全措施（必要时可附页绘图说明）</Text>
                <InputItem onChange={(v)=>this.handleInput('username',v)} style={{borderRadius:5,backgroundColor:'white',width:'85%'}}/>
                <View style={{display:'flex',flexDirection:'row',margin:10}}>
                 <Checkbox/>
                 <Text style={{left:10}}>是否已执行</Text>
                </View>
            </View>
            <View style={{}}>
                <Text style={{left:5}}>工作地点保留带电部分或注意事项（由工作票签发人填写）</Text>
                <InputItem onChange={(v)=>this.handleInput('username',v)} style={{borderRadius:5,backgroundColor:'white',width:'85%'}}/>
            </View>
            <View style={{}}>
                <Text style={{left:5}}>补充工作地点保留带电部分或安全措施（由工作许可人填写）</Text>
                <InputItem onChange={(v)=>this.handleInput('username',v)} style={{borderRadius:5,backgroundColor:'white',width:'85%'}}/>
            </View>
            </View>
            <View style={{backgroundColor:'white',marginTop:5}}>
              <View style={{
                  width:'100%',
                  height:30,
                  backgroundColor:'white',
                  borderBottomWidth:1,
                  borderBottomColor:'black',
                  borderStyle:'solid',
                  justifyContent:'center',
                  }}>
                  <Text style={{color:'#3e5ed2',left:5}}>确认工作内容</Text>
              </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Text style={{left:5}}>许可开始工作时间</Text>
                <View style={{left:5,width:260}}><DatePicker
                value={this.state.value}
                mode="date"
                minDate={new Date(1999, 7, 6)}
                maxDate={new Date(2000, 11, 3)}
                onChange={this.onChange}
                format="YYYY-MM-DD"
                >
                <List.Item arrow="horizontal"></List.Item>
                </DatePicker></View>
            </View>
            </View>
            <View style={{backgroundColor:'white',marginTop:5}}>
              <View style={{
                  width:'100%',
                  height:30,
                  backgroundColor:'white',
                  borderBottomWidth:1,
                  borderBottomColor:'black',
                  borderStyle:'solid',
                  justifyContent:'center',
                  }}>
                  <Text style={{color:'#3e5ed2',left:5}}>人员变动</Text>
              </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Text style={{left:5}}>原工作负责人</Text>
                <ModalDropdown defaultValue={'请选择'} options={['option 1', 'option 2']}/>
            </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Text style={{left:5}}>变更后工作负责人</Text>
                <ModalDropdown defaultValue={'请选择'} options={['option 1', 'option 2']}/>
            </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Text style={{left:5}}>工作人员变动情况</Text>
                <InputItem onChange={(v)=>this.handleInput('username',v)} style={{borderRadius:5,backgroundColor:'white',width:'85%'}}/>
            </View>
            </View>
            <View style={{backgroundColor:'white',marginTop:5}}>
              <View style={{
                  width:'100%',
                  height:30,
                  backgroundColor:'white',
                  borderBottomWidth:1,
                  borderBottomColor:'black',
                  borderStyle:'solid',
                  justifyContent:'center',
                  }}>
                  <Text style={{color:'#3e5ed2',left:5}}>工作票延期</Text>
              </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Text style={{left:5}}>有效期延长到</Text>
                <View style={{left:5,width:290}}><DatePicker
                value={this.state.value}
                mode="date"
                minDate={new Date(1999, 7, 6)}
                maxDate={new Date(2000, 11, 3)}
                onChange={this.onChange}
                format="YYYY-MM-DD"
                >
                <List.Item arrow="horizontal"></List.Item>
                </DatePicker></View>
            </View>
            </View>
            <View style={{backgroundColor:'white',marginTop:5}}>
              <View style={{
                  width:'100%',
                  height:30,
                  backgroundColor:'white',
                  borderBottomWidth:1,
                  borderBottomColor:'black',
                  borderStyle:'solid',
                  justifyContent:'center',
                  }}>
                  <Text style={{color:'#3e5ed2',left:5}}>每日开工和收工时间（使用一天的工作票不必填写）</Text>
              </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Text style={{left:5}}>开工时间</Text>
                <View style={{left:5,width:310}}><DatePicker
                value={this.state.value}
                mode="date"
                minDate={new Date(1999, 7, 6)}
                maxDate={new Date(2000, 11, 3)}
                onChange={this.onChange}
                format="YYYY-MM-DD"
                >
                <List.Item arrow="horizontal"></List.Item>
                </DatePicker></View>
            </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Text style={{left:5}}>收工时间</Text>
                <View style={{left:5,width:310}}><DatePicker
                value={this.state.value}
                mode="date"
                minDate={new Date(1999, 7, 6)}
                maxDate={new Date(2000, 11, 3)}
                onChange={this.onChange}
                format="YYYY-MM-DD"
                >
                <List.Item arrow="horizontal"></List.Item>
                </DatePicker></View>
            </View>
            </View>
            <View style={{backgroundColor:'white',marginTop:5}}>
              <View style={{
                  width:'100%',
                  height:30,
                  backgroundColor:'white',
                  borderBottomWidth:1,
                  borderBottomColor:'black',
                  borderStyle:'solid',
                  justifyContent:'center',
                  }}>
                  <Text style={{color:'#3e5ed2',left:5}}>工作终结</Text>
              </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Text style={{left:5}}>工作结束时间</Text>
                <View style={{left:5,width:290}}><DatePicker
                value={this.state.value}
                mode="date"
                minDate={new Date(2015, 7, 6)}
                maxDate={new Date(2026, 11, 3)}
                onChange={this.onChange}
                format="YYYY-MM-DD"
                >
                <List.Item arrow="horizontal"></List.Item>
                </DatePicker>
                </View>
            </View>
            </View>
            <View style={{backgroundColor:'white',marginTop:5}}>
              <View style={{
                  width:'100%',
                  height:30,
                  backgroundColor:'white',
                  borderBottomWidth:1,
                  borderBottomColor:'black',
                  borderStyle:'solid',
                  justifyContent:'center',
                  }}>
                  <Text style={{color:'#3e5ed2',left:5}}>备注</Text>
              </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Text style={{left:5}}>制定专责监护人</Text>
                <ModalDropdown defaultValue={'请选择'} options={['option 1', 'option 2']}/>
            </View>
            <View>
            <Text style={{left:5}}>地点及具体工作</Text>
            <InputItem onChange={(v)=>this.handleInput('username',v)} style={{borderRadius:5,backgroundColor:'white',width:'85%'}}/>
            </View>
            <View>
            <Text style={{left:5}}>其他事项</Text>
            <InputItem onChange={(v)=>this.handleInput('username',v)} style={{borderRadius:5,backgroundColor:'white',width:'85%'}}/>
            </View>
            </View>
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