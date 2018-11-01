import React from 'react';
import Title from './Title';
import {Checkbox} from 'antd-mobile-rn';
import * as Animatable from 'react-native-animatable';
import {ttmsTickets,searchUserPower,userlist} from './../api/api'
import {View,Text,ScrollView,TouchableOpacity,Image,Alert} from 'react-native';

export default class TicketModel extends React.Component{
     constructor(props){
         super(props)
         this.state={
            uzi:[],
            ty:''
         }
     }

     async componentDidMount(){
         let k = this.props.navigation.state.params.name;
         let j = `?form.tree_node_id=${k}`
         let h = await ttmsTickets(j);
         
         this.setState({
             uzi:h.form.dataList,
         })
     }

    async goticket(name,v){

        let id = jconfig.userinfo.user;
        let jack = '?form.paramAllList.userid='+id
        let list = await userlist(jack);
        console.log("======>",list);
        this.xunahn(name,v,list.form.paramAllList) 
        } 
    //权限判断
    async xunahn(name,v,sss){
        let s = sss;
        let p =false;
        for (let index = 0; index < s.length; index++) {
            const element = s[index];
            if (jconfig.userinfo.user!=element.userid) {
                p=false;
            } else {
                p=true;
                const {navigate} = this.props.navigation;
                let j = `?form.tree_node_id=${this.props.navigation.state.params.name}`;
                let n = await searchUserPower(j);
                var flag = false;
                for(var i = 0; i < n.form.dataList.length; i++){
                    if(n.form.dataList[i].userId == element.userid){
                        flag = true;
                    }
                }
                if (flag) {
                    navigate('TicketDetail',{name,v})
                } else {
                    Alert.alert("提示","你没有权限创建此模板")
                }
            }
        }
        if(!p){
            Alert.alert("提示","你没有权限创建此模板")
        }
    }

    render(){
        console.log(window.jconfig,"--------------")
        return(
            <View>
            <Title navigation={this.props.navigation} rightText="查看流程" centerText={this.props.navigation.state.params.v+'模板'}/>
            <ScrollView style={{paddingBottom:10}}>
               {
                   this.state.uzi.map((v,i)=>
                   <Animatable.View key={i} useNativeDriver animation="fadeInRight" easing="ease-out-circ">
                   <TouchableOpacity  
                   onPress={()=>this.goticket(v.TicketTemplateID,this.props.navigation.state.params.v)} 
                   style={{display:'flex',flexDirection:'row',width:'100%',backgroundColor:'#beebff',height:50,alignItems:'center',marginTop:10}}>
                          <Image source={require('../images/company_tree.png')} style={{width:20,left:5,resizeMode:Image.resizeMode.contain}}/>
                           <Text style={{fontSize:18,color:'black',left:10,flex:1}}>{v.TicketTemplateName}</Text>
                          <Image source={require('../images/go.png')} style={{right:5,width:15,resizeMode:Image.resizeMode.contain}}/>
                   </TouchableOpacity>
                   </Animatable.View> 
                  )
               }
            </ScrollView>
            </View>
        )
    }
}