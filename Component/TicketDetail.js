import React from 'react';
import Title from './Title';
import {InputItem,DatePickerView,DatePicker,List,Radio} from 'antd-mobile-rn';
import {View,Text,ScrollView,TouchableOpacity} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
const RadioItem = Radio.RadioItem;

export default class Tdetail extends React.Component{
    constructor(props){
        super(props)
        this.state={
            username:'',
            part1Value: 1,
            part2Value: 1,
            value: null,
        }
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
            <View style={{}}>
                <Text style={{left:5}}>安全措施（必要时可附页绘图说明）</Text>
                <InputItem onChange={(v)=>this.handleInput('username',v)} style={{borderRadius:5,backgroundColor:'white',width:'85%'}}/>
                <Radio
            checked={this.state.part1Value === 1}
            onChange={(event) => {
              if (event.target.checked) {
                this.setState({ part1Value: 1 });
              }
            }}
            style={{ borderWidth: 1, borderColor: '#999', margin: 10 }}
          >
           是否已执行
          </Radio>
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
                <ModalDropdown options={['option 1', 'option 2']}/>
            </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Text style={{left:5}}>变更后工作负责人</Text>
                <ModalDropdown options={['option 1', 'option 2']}/>
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
                <ModalDropdown options={['option 1', 'option 2']}/>
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
                <Text style={{left:5}}>是否同意</Text>
                <ModalDropdown options={['option 1', 'option 2']}/>
            </View>
            <View>
                <Text style={{left:5}}>流转状态</Text>
                <ModalDropdown options={['option 1', 'option 2']}/>
            </View>
            <View>
                <Text style={{left:5}}>流转目标</Text>
                <ModalDropdown options={['option 1', 'option 2']}/>
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