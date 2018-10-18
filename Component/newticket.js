import React from 'react';
import Title from './Title';
import {moban} from './../api/api'
import {View,Text,TouchableOpacity,Image} from 'react-native';

export default class Newticket extends React.Component{
    constructor(props){
        super(props)
        this.state={
          jay:{},
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


    async componentDidMount(){
        let op = '?form.tree_node_id=0&form.tree_node_operation=0'
        let e = await moban(op)
        console.log(e,'jj')
        this.setState({
            jay:e.form
        })
        this.kai()
    }
    kai(){
    }
     
    goticket(name){
        const {navigate} = this.props.navigation
        navigate('TicketModel',{name})
    }

    render(){
        console.log(this.state.jay.tree_data,'jay')
        return(
            <View>
             <Title navigation={this.props.navigation} centerText={'选择模板'}/>
             {
                 this.state.type.map((v,i)=>
                    <TouchableOpacity key={i} onPress={()=>this.goticket(v.name)} style={{display:'flex',flexDirection:'row',width:'100%',backgroundColor:'#beebff',height:50,display:'flex',alignItems:'center',marginTop:10}}>
                            <Image source={require('../images/company_tree.png')} style={{width:15,left:5,resizeMode:Image.resizeMode.contain}}/>
                            <Text style={{fontSize:18,color:'black',left:10,flex:1}}>{v.name}</Text>
                        <Image source={require('../images/go.png')} style={{right:5,width:15,resizeMode:Image.resizeMode.contain}}/>
                    </TouchableOpacity>)
             }
        </View>)
    }
}