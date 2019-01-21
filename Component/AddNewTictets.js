import Topt from './TopTitle';
import React from 'react';
import HttpUtils from '../api/Httpdata3';
// import {moban,ttmsTickets,searchUserPower,userlist} from '../api/api';
import {Text,TouchableOpacity,Image,Alert,ScrollView,View} from 'react-native';

export default class AddNewT extends React.Component{
    constructor(props){
        super(props)
        this.state={
          http:jconfig.netWorkIp?jconfig.netWorkIp:'http://59.172.204.182:8030/ttms',
          jay:[],
          jkl:[],
        }
    }


    async componentDidMount(){
        let op = '?form.tree_node_id=0&form.tree_node_operation=0'
        let e = await HttpUtils.AjaxData(`${this.state.http}/baseInformation/templateMng_loadTree.action`,op) //moban(op)
        this.setState({
            jay:e.form.tree_data[0].children
        })
    }
     
   async goticket(names,v){
        let j = `?form.tree_node_id=${names}`
        let h = await HttpUtils.AjaxData(`${this.state.http}/ticketMng/ticketMng_loadTemplate.action`,j) // ttmsTickets(j);
        if(h.form.dataList.length==0){
            return Alert.alert(
                 "提示",
                 "该票错误，请选择其他票！",
                 [
                   {text: '确定'},
                 ],
                 {cancelable:false}
               )
         }
        let name= h.form.dataList[0].TicketTemplateID;
        
        let list = await HttpUtils.AjaxData(`${this.state.http}/home/home_showUserDatas.action`,'') //userlist();
        this.xunahn(name,v,list.form.paramAllList,names)
    } 

    async xunahn(name,v,sss,treeid){
        let s = sss;
        let p =false;
        for (let index = 0; index < s.length; index++) {
            const element = s[index];
            if (jconfig.userinfo.user!=element.userid) {
                p=false;
            } else {
                p=true;
                const {navigate} = this.props.navigation;
                let j = `?form.tree_node_id=${treeid}`;
                let n = await HttpUtils.AjaxData(`${this.state.http}/ticketMng/ticketMng_searchUserPower.action`,j)  //searchUserPower(j);
                var flag = false;
                for(var i = 0; i < n.form.dataList.length; i++){
                    if(n.form.dataList[i].userId == element.userid){
                        flag = true;
                    }
                }
                if (flag) {
                    navigate('TicketDetail',{name,v,treeid})
                } else {
                    Alert.alert("提示","你没有权限创建此模板", [
                        { text: '是' },
                    ],
                    { cancelable: false })
                }
            }
        }
        if(!p){
            Alert.alert("提示","你没有权限创建此模板", [
                { text: '是'},
            ],
            { cancelable: false })
        }
    }
    render(){
        return(<View style={{alignItems:'center',width:'100%', height:'100%'}}>
              <Topt navigation={this.props.navigation} centerText={'两票模板'} />
             <ScrollView style={{marginTop:5,width:'100%',marginBottom:5}}>
             {
                this.state.jay.map((v,i)=><View key={i} style={{alignItems:'center'}}>
                    <TouchableOpacity key={i} onPress={()=>this.goticket(v.attr.tree_id.substring(2),v.data.title)} style={{borderRadius:3,backgroundColor:'white',width:'96%',flexDirection:'row',alignItems:'center',marginTop:2.5,marginBottom:2.5}}>
                            <Image source={require('../images/company_tree.png')} style={{marginLeft:5,width:30,resizeMode:Image.resizeMode.contain}}/>
                            <Text style={{fontSize:18,color:'#363434',left:14,flex:1}}>{v.data.title}</Text>
                        <Image source={require('../images/go1.png')} style={{right:5,width:15,resizeMode:Image.resizeMode.contain}}/>
                    </TouchableOpacity>
                    </View>)
             }
             </ScrollView>
        </View>)
    }
}