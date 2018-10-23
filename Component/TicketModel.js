import React from 'react';
import Title from './Title';
import {ttmsTickets,searchUserPower} from './../api/api'
import {View,Text,ScrollView,TouchableOpacity,Image} from 'react-native';

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

    async goticket(userId,name,v){
        const {navigate} = this.props.navigation
        console.log(userId,"---------")
        // let j = `?form.tree_node_id=${this.props.navigation.state.params.name}`;
        // let n = await searchUserPower(j)
         navigate('TicketDetail',{name,v})
        } 

    render(){
        console.log(window.jconfig,"--------------")
        return(
            <View>
            <Title navigation={this.props.navigation} rightText="查看流程" centerText={this.props.navigation.state.params.v+'模板'}/>
               {
                   this.state.uzi.map((v,i)=>
                   <TouchableOpacity key={i} 
                   onPress={()=>this.goticket(v.userId,v.TicketTemplateID,this.props.navigation.state.params.v)} 
                   style={{display:'flex',flexDirection:'row',width:'100%',backgroundColor:'#beebff',height:50,display:'flex',alignItems:'center',marginTop:10}}>
                           <Image source={require('../images/company_tree.png')} style={{width:15,left:5,resizeMode:Image.resizeMode.contain}}/>
                           <Text style={{fontSize:18,color:'black',left:10,flex:1}}>{v.TicketTemplateName}</Text>
                       <Image source={require('../images/go.png')} style={{right:5,width:15,resizeMode:Image.resizeMode.contain}}/>
                   </TouchableOpacity>
                  )
               }
            </View>
        )
    }
}