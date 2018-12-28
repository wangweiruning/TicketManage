import React from 'react';
import {Text,View,Image} from 'react-native';
import Topt from './TopTitle';
import {awaitdeteal,historys,correation} from '../api/api';

export default class MyTicets extends React.Component{
    constructor(props){
        super(props)
        this.state={
            aiaitList:"",
            corrlateList:'',
            history:'',
        }
    }

    async componentDidMount(){
        const histo = await historys("?form.tree_node_operation="+0);
        const datas = "?form.userId="+histo.form.userId;
        const result = await awaitdeteal(datas);//待处理数据
        const datas2 = "?form.tree_node_operation="+0;
        const result2 = await historys(datas2);//历史数据
        const datas3 = "?form.userId="+result2.form.userId;
        const result3 = await correation(datas3);//相关流程数据
        this.setState({
          aiaitList:result.form.dataList.length,
          history:result2.form.page.totalRecords,
          corrlateList:result3.form.dataList.length
        })
  }


    render(){
        return(<View style={{alignItems:'center'}}>
              <Topt navigation={this.props.navigation} centerText={'两票总览'}/>
              <View style={{height:70,flexDirection:'row',padding:5,alignItems:'center',width:'93%',borderRadius:5,marginTop:10,backgroundColor:'white'}}>
                  <Image source={require('../images/unhandle_ticket.png')} style={{marginLeft:5,width:30,height:30,resizeMode:Image.resizeMode.contain,marginRight:15}}/>
                  <Text style={{color:"#363434",fontSize:18}}>待处理流程共{this.state.aiaitList}条</Text>
              </View>
              <View style={{height:70,flexDirection:'row',padding:5,alignItems:'center',width:'93%',borderRadius:5,marginTop:10,backgroundColor:'white'}}>
                  <Image source={require('../images/online_ticket.png')} style={{marginLeft:5,width:30,height:30,resizeMode:Image.resizeMode.contain,marginRight:15}}/>
                  <Text style={{color:"#363434",fontSize:18}}>相关流程共{this.state.corrlateList}条</Text>
              </View>
              <View style={{height:70,flexDirection:'row',padding:5,alignItems:'center',width:'93%',borderRadius:5,marginTop:10,backgroundColor:'white'}}>
                  <Image source={require('../images/search_ticket.png')} style={{marginLeft:5,width:30,height:30,resizeMode:Image.resizeMode.contain,marginRight:15}}/>
                  <Text style={{color:"#363434",fontSize:18}}>历史流程共{this.state.history}条</Text>
              </View>
        </View>)
    }
}