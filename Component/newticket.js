import React from 'react';
import Title from './Title';
import {moban,ttmsTickets,searchUserPower,userlist} from './../api/api';
import * as Animatable from 'react-native-animatable';
import {Text,TouchableOpacity,Image,Alert,ScrollView,ImageBackground,StatusBar} from 'react-native';

export default class Newticket extends React.Component{
    constructor(props){
        super(props)
        this.state={
          jay:[],
          jkl:[],
        }
    }


    async componentDidMount(){
        let op = '?form.tree_node_id=0&form.tree_node_operation=0'
        let e = await moban(op)
        this.setState({
            jay:e.form.tree_data[0].children
        })
    }
     
   async goticket(names,v){
        let j = `?form.tree_node_id=${names}`
        let h = await ttmsTickets(j);
        let name= h.form.dataList[0].TicketTemplateID;
        let list = await userlist();
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
                let n = await searchUserPower(j);
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
        return(<ImageBackground source={require('../images/gffg.jpg')} style={{alignItems:'center',width: '100%', height: '100%'}}>
                <Title navigation={this.props.navigation} centerText={'选择模板'}/>
             <ScrollView style={{position:'absolute',top:45+StatusBar.currentHeight,paddingBottom:30,marginBottom:10,width:'95%',backgroundColor:'rgba(255,255,255,.2)',borderRadius:4}}>
             {
                this.state.jay.map((v,i)=>
                <Animatable.View key={i} style={{alignItems:'center'}} useNativeDriver animation="fadeInRight" easing="ease-out-expo">
                    <TouchableOpacity
                    onPress={()=>this.goticket(v.attr.tree_id.substring(2),v.data.title)}
                    style={{width:'93%',padding:4,flexDirection:'row',alignItems:'center',marginTop:2}}>
                            <Image source={require('../images/company_tree.png')} style={{width:35,resizeMode:Image.resizeMode.contain}}/>
                            <Text style={{fontSize:18,color:'#f5f5f5',left:14,flex:1}}>{v.data.title}</Text>
                        <Image source={require('../images/go1.png')} style={{right:5,width:15,resizeMode:Image.resizeMode.contain}}/>
                    </TouchableOpacity>
                    <Image source={require('../images/line.png')} style={{width:'90%',height:2,resizeMode:Image.resizeMode.contain,left:10}}/>
                    </Animatable.View>)
             }
             </ScrollView>
        </ImageBackground>)
    }
}