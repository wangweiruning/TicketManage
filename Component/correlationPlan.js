import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,ScrollView,Button } from 'react-native';
import Title from './Title'
export default class CorrelationPlan extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        animating: false,
        datas:{
          TicketTypeName:'水力自控工作票',
          HeadUser:'央研究院11',
          TicketSerialNum:'1',
          content:'222222222',
          lastTime:'2018-09-27T15:06:01'
  
        }
    };
  }


  render() {
    const { navigate } = this.props.navigation;
    const itemdata = this.state.datas;
    return (
      <View>
        <Title navigation={this.props.navigation} centerText={'相关流程'} />
        <ScrollView style={{marginBottom:50}}>
        {/* <TouchableOpacity> */}
            <View style={{backgroundColor:"#ffffff",marginTop:10}}>
                <View style={{marginTop:5,paddingBottom:10,paddingTop:10,color:"#000000",width:"90%",marginLeft:20}}>
                    <Text style={{color:"#000000"}}>两票类型：{itemdata.TicketTypeName}</Text>
                    <Text style={{color:"#000000"}}>负责人：{itemdata.HeadUser}</Text>
                    <Text style={{color:"#000000"}}>编号：{itemdata.TicketSerialNum}</Text>
                    <View><Text style={{color:"#000000"}}>内容：</Text></View>
                    <Text numberOfLines={10} style = {{paddingBottom:15,borderColor:"#eeeeee",borderWidth:1,borderStyle:"solid",color:"#000000"}}>{itemdata.content}</Text>
                    <Text style={{color:"#000000"}}>处理时间：{itemdata.lastTime}</Text>
                    <Button
                        onPress={()=>navigate('litile',{TicketSerialNum:itemdata.TicketSerialNum})}
                        title="查看详情"
                        color="#406ea4"
                        />
                </View>
            </View>
            <View style={{backgroundColor:"#ffffff",marginTop:10}}>
                <View style={{marginTop:5,paddingBottom:10,paddingTop:10,color:"#000000",width:"90%",marginLeft:20}}>
                    <Text style={{color:"#000000"}}>两票类型：{itemdata.TicketTypeName}</Text>
                    <Text style={{color:"#000000"}}>负责人：{itemdata.HeadUser}</Text>
                    <Text style={{color:"#000000"}}>编号：{itemdata.TicketSerialNum}</Text>
                    <View><Text style={{color:"#000000"}}>内容：</Text></View>
                    <Text numberOfLines={10} style = {{paddingBottom:15,borderColor:"#eeeeee",borderWidth:1,borderStyle:"solid",color:"#000000"}}>{itemdata.content}</Text>
                    <Text style={{color:"#000000"}}>处理时间：{itemdata.lastTime}</Text>
                    <Button
                        onPress={()=>navigate('litile',{TicketSerialNum:itemdata.TicketSerialNum})}
                        title="查看详情"
                        color="#406ea4"
                        />
                </View>
            </View><View style={{backgroundColor:"#ffffff",marginTop:10}}>
                <View style={{marginTop:5,paddingBottom:10,paddingTop:10,color:"#000000",width:"90%",marginLeft:20}}>
                    <Text style={{color:"#000000"}}>两票类型：{itemdata.TicketTypeName}</Text>
                    <Text style={{color:"#000000"}}>负责人：{itemdata.HeadUser}</Text>
                    <Text style={{color:"#000000"}}>编号：{itemdata.TicketSerialNum}</Text>
                    <View><Text style={{color:"#000000"}}>内容：</Text></View>
                    <Text numberOfLines={10} style = {{paddingBottom:15,borderColor:"#eeeeee",borderWidth:1,borderStyle:"solid",color:"#000000"}}>{itemdata.content}</Text>
                    <Text style={{color:"#000000"}}>处理时间：{itemdata.lastTime}</Text>
                    <Button
                        onPress={()=>navigate('litile',{TicketSerialNum:itemdata.TicketSerialNum})}
                        title="查看详情"
                        color="#406ea4"
                        />
                </View>
            </View>
        {/* </TouchableOpacity> */}
        </ScrollView>
      </View>
    );
  }
}