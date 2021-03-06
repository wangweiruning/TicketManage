import React from 'react';
import {Text,View,Image,TouchableOpacity} from 'react-native';
import Topt from './TopTitle';
import HttpUtils from '../api/Httpdata3';
// import {awaitdeteal,historys,correation} from '../api/api';
import LunboComponent from './lunbo';

export default class HomeScreen extends React.Component {

  constructor(props){
    super(props)
    this.state={
      http:jconfig.netWorkIp?jconfig.netWorkIp:'http://59.172.204.182:8030/ttms',
      content:[
        {
          img:require('../images/go1.png'),
          wait:'待处理流程',
          about:'相关流程',
          history:'历史流程',
          Addnew:'两票模板',
          network:'网络配置',
          aboutme:'关于'
        }
      ],
      aiaitList:"",
      corrlateList:'',
      history:'',
      loading:''
    }
  }

  async componentDidMount(){
    let histo = await HttpUtils.AjaxData(`${this.state.http}/ticketMng/ticketMng_loadGrid.action`,"?form.tree_node_operation="+0);
    let datas = "?form.userId="+histo.form.userId;
    let result = await HttpUtils.AjaxData(`${this.state.http}/ticketMng/ticketMng_searchUnhandle.action`,datas)   //待处理数据
    let datas2 = "?form.tree_node_operation="+0;
    let result2 = await HttpUtils.AjaxData(`${this.state.http}/ticketMng/ticketMng_loadGrid.action`,datas2) //历史数据
    let datas3 = "?form.userId="+result2.form.userId;
    let result3 = await HttpUtils.AjaxData(`${this.state.http}/ticketMng/ticketMng_searchOnline.action`,datas3) //相关流程数据
    this.setState({
      loading:result.form.dataList,
      aiaitList:result.form.dataList.length,
      history:result2.form.page.totalRecords,
      corrlateList:result3.form.dataList.length
    })
}

    componentWillUnmount = () => {
      this.setState = (state,callback)=>{
        return;
      };
    }

    
  render() {
      let { navigate } = this.props.navigation;
      return (<View>
        <Topt navigation={this.props.navigation} centerText={'首页'} datas={this.state.loading}/>
        <LunboComponent />
          {this.state.content.map((v,i)=><View key={i} style={{justifyContent:'center',flexWrap:'wrap',flexDirection:'row',marginTop:8}}>
            <TouchableOpacity onPress={()=>navigate('waitPlan')} style={{height:100,width:'31.5%',alignItems:'center',backgroundColor:'white',marginRight:2}} activeOpacity={.8}>
            <View style={{justifyContent:'flex-end',top:5,minWidth:'100%',flexDirection:'row',marginRight:5,height:20}}> 
                  {this.state.loading?<View style={{borderRadius:10,width:30,height:20,justifyContent:'center',alignItems:'center',backgroundColor:'#fc6b3f'}}>
                     <Text style={{color:'white'}}>{this.state.aiaitList>99?'99+':this.state.aiaitList}</Text>
                  </View>:null}
            </View>
                  <Image source={require('../images/await.png')} style={{width:35,height:35,resizeMode:Image.resizeMode.contain}}/>
                  <Text style={{color:'#1296db',fontSize:18,marginTop:10}}>{v.wait}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('correlationPlan')} style={{height:100,width:'31.5%',alignItems:'center',backgroundColor:'white',marginRight:2}} activeOpacity={.8}>
            <View style={{justifyContent:'flex-end',top:5,minWidth:'100%',flexDirection:'row',marginRight:5,height:20}}> 
                  {this.state.loading?<View style={{borderRadius:10,width:30,height:20,justifyContent:'center',alignItems:'center',backgroundColor:'#53c7f0'}}>
                     <Text style={{color:'white'}}>{this.state.corrlateList>99?'99+':this.state.corrlateList}</Text>
                  </View>:null}
            </View>
                  <Image source={require('../images/colle.png')} style={{width:38,height:38,resizeMode:Image.resizeMode.contain,marginTop:2}}/>
                  <Text style={{color:'#1296db',fontSize:18,marginTop:5}}>{v.about}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('historyPlan')} style={{height:100,width:'31.5%',alignItems:'center',backgroundColor:'white'}} activeOpacity={.8}>
                  <Image source={require('../images/history.png')} style={{width:35,height:35,resizeMode:Image.resizeMode.contain,marginTop:23}}/>
                  <Text style={{color:'#1296db',fontSize:18,marginTop:8}}>{v.history}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('AddNewTictetsTow')} style={{marginTop:2,height:100,width:'31.5%',alignItems:'center',backgroundColor:'white',marginRight:2}} activeOpacity={.8}>
                  <Image source={require('../images/moda.png')} style={{width:30,height:30,resizeMode:Image.resizeMode.contain,marginTop:18}}/>
                  <Text style={{color:'#1296db',fontSize:18,marginTop:15}}>{v.Addnew}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('Network')} style={{marginTop:2,height:100,width:'31.5%',alignItems:'center',backgroundColor:'white',marginRight:2}} activeOpacity={.8}>
                  <Image source={require('../images/shezhi.png')} style={{width:30,height:30,resizeMode:Image.resizeMode.contain,marginTop:18}}/>
                  <Text style={{color:'#1296db',fontSize:18,marginTop:15}}>{v.network}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('Aboutme')} style={{marginTop:2,height:100,width:'31.5%',alignItems:'center',backgroundColor:'white'}} activeOpacity={.8}>
                  <Image source={require('../images/ours.png')} style={{width:30,height:30,resizeMode:Image.resizeMode.contain,marginTop:18}}/>
                  <Text style={{color:'#1296db',fontSize:18,marginTop:15}}>{v.aboutme}</Text>
            </TouchableOpacity>
          </View>)}
          </View>)
    }
  }