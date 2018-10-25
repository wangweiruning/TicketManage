import React from 'react';
import Title from './Title';
import {moban} from './../api/api'
import {View,Text,TouchableOpacity,Image,Alert} from 'react-native';

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
        console.log(e.form.tree_data[0].children,'jj')
        this.setState({
            jay:e.form.tree_data[0].children
        })
    }
     
   goticket(name,v){
        const {navigate} = this.props.navigation
        if(!jconfig.userinfo.status) return Alert.alert(
            "登录验证",
            "你还没有登录哦，请先登录再来吧",
            [
              {text: '返回', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: '去登陆', onPress: () => navigate('login')},
            ],
          );
        navigate('TicketModel',{name,v})
    } 

    render(){
        return(
            <View>
             <Title navigation={this.props.navigation} centerText={'选择模板'}/>
             {
                this.state.jay.map((v,i)=>
                    <TouchableOpacity key={i} 
                    onPress={()=>this.goticket(v.attr.tree_id.substring(2),v.data.title)} 
                    style={{display:'flex',flexDirection:'row',width:'100%',backgroundColor:'#beebff',height:50,display:'flex',alignItems:'center',marginTop:10}}>
                            <Image source={require('../images/company_tree.png')} style={{width:15,left:5,resizeMode:Image.resizeMode.contain}}/>
                            <Text style={{fontSize:18,color:'black',left:10,flex:1}}>{v.data.title}</Text>
                        <Image source={require('../images/go.png')} style={{right:5,width:15,resizeMode:Image.resizeMode.contain}}/>
                    </TouchableOpacity>)
             }
        </View>)
    }
}