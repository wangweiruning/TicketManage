import React from 'react';
import Title from './Title';
import {moban} from './../api/api';
import * as Animatable from 'react-native-animatable';
import {View,Text,TouchableOpacity,Image,Alert,ScrollView} from 'react-native';

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
             <ScrollView style={{paddingBottom:10}}>
             {
                this.state.jay.map((v,i)=>
                <Animatable.View key={i} useNativeDriver animation="fadeInRight" easing="ease-out-quart">
                    <TouchableOpacity key={i} 
                    onPress={()=>this.goticket(v.attr.tree_id.substring(2),v.data.title)} 
                    style={{display:'flex',flexDirection:'row',backgroundColor:'#beebff',alignItems:'center',marginTop:10}}>
                            <Image source={require('../images/company_tree.png')} style={{width:20,left:5,resizeMode:Image.resizeMode.contain}}/>
                            <Text style={{fontSize:18,color:'black',left:10,flex:1}}>{v.data.title}</Text>
                        <Image source={require('../images/go.png')} style={{right:5,width:15,resizeMode:Image.resizeMode.contain}}/>
                    </TouchableOpacity>
                    </Animatable.View>)
             }
             </ScrollView>
        </View>)
    }
}