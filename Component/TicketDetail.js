import React from 'react';
import Title from './Title';
import {InputItem,DatePickerView,DatePicker,List } from 'antd-mobile-rn';
import {View,Text,ScrollView,TouchableOpacity} from 'react-native';

export default class Tdetail extends React.Component{
    constructor(props){
        super(props)
        this.state={
            username:'',
            value: null,
        }
    }
    
      onChange = (value) => {
        console.log(value);
        this.setState({ value });
      }
      onValueChange = (...args) => {
        console.log(args);
      }

    handleInput(k, v){
        this.setState({
            [k]: v
        });
        alert(v)
    }
    render(){
        return(<View style={{alignItems:'center'}}>
            <Title navigation={this.props.navigation} centerText={this.props.navigation.state.params.name}/>
        <ScrollView>
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
                <InputItem onChange={(v)=>this.handleInput('username',v)} style={{borderRadius:5,backgroundColor:'white',width:'85%'}}/>
            </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Text style={{left:5}}>班组</Text>
                <InputItem onChange={(v)=>this.handleInput('username',v)} style={{borderRadius:5,backgroundColor:'white',width:'85%'}}/>
            </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Text style={{left:5}}>工作组成员</Text>
                <InputItem onChange={(v)=>this.handleInput('username',v)} style={{borderRadius:5,backgroundColor:'white',width:'85%'}}/>
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
                <InputItem onChange={(v)=>this.handleInput('username',v)} style={{borderRadius:5,backgroundColor:'white',width:'85%'}}/>
            </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Text style={{left:5}}>班组</Text>
                <InputItem onChange={(v)=>this.handleInput('username',v)} style={{borderRadius:5,backgroundColor:'white',width:'85%'}}/>
            </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Text style={{left:5}}>工作组成员</Text>
                <InputItem onChange={(v)=>this.handleInput('username',v)} style={{borderRadius:5,backgroundColor:'white',width:'85%'}}/>
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
                
            </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Text style={{left:5}}>变更后工作负责人</Text>
                
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
            <View style={{backgroundColor:'white',marginTop:5,marginBottom:43}}>
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
            <View>
                <Text style={{left:5}}>许可开始工作时间</Text>
            </View>
            </View>
        </ScrollView>
        <View style={{marginBottom:40}}>
             <TouchableOpacity style={{justifyContent:'center',alignItems:'center',width:'80%',backgroundColor:'#3e5ed2',borderRadius:5,height:40}}>
                <Text style={{color:'white',fontSize:20}}>退出</Text>
        </TouchableOpacity></View>
        </View>)
    }
}