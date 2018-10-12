import React from 'react';
import Title from './Title';
import {View,Text,TouchableOpacity,Image} from 'react-native';

export default class Newticket extends React.Component{
    constructor(props){
        super(props)
        this.state={
          type:[
                {
                    name:'二级动火工作票'
                },
                {
                    name:'电气第一种工作票'
                },
                {
                    name:'电气第二种工作票'
                },
                {
                    name:'操作票'
                },
                {
                    name:'水利自控工作票'
                },
                {
                    name:'水利机械第一种工作票'
                }
            ]
        }
    }

    goticket(name){
        const {navigate} = this.props.navigation
        navigate('TicketDetail',{name})
    }

    render(){
        return(
            <View>
             <Title navigation={this.props.navigation} centerText={'选择模板'}/>
             {
                 this.state.type.map((v)=>
                    <TouchableOpacity onPress={()=>this.goticket(v.name)} style={{display:'flex',flexDirection:'row',width:'100%',backgroundColor:'#beebff',height:50,display:'flex',alignItems:'center',marginTop:10}}>
                            <Text style={{fontSize:18,color:'black',left:10,flex:1}}>{v.name}</Text>
                        <Image source={require('../images/go.png')} style={{right:5,width:15,resizeMode:Image.resizeMode.contain}}/>
                    </TouchableOpacity>)
             }
        </View>)
    }
}